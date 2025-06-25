import { toast } from 'sonner';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SocialNetwork, User, UserUpdateData } from '../types';

import { isValidUrl } from '../utils';
import { socials } from '../data/socials.ts';
import DevTreeInput from '../components/DevTreeInput.tsx';
import { updateUserProfileHttp } from '../services/usersApi.ts';

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(socials);
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<User>(['my-user'])!;

  const { mutate: updateUserProfile } = useMutation({
    mutationFn: (userUpdateData: UserUpdateData) =>
      updateUserProfileHttp(currentUser._id, userUpdateData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Updated successfully');
    },
  });

  useEffect(() => {
    let parsedUserLinks: SocialNetwork[] = [];

    try {
      // TODO: Validate with zod or something similar
      parsedUserLinks = JSON.parse(currentUser.links);
    } catch (error) {
      console.error('Error parsing user links:', error);
    }

    const updatedData = devTreeLinks.map((item) => {
      const userLink = parsedUserLinks.find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setDevTreeLinks(updatedData);
  }, []);

  const saveChangesHandler = () => {
    const errors: string[] = [];

    devTreeLinks.forEach((link) => {
      if (link.enabled && !isValidUrl(link.url)) {
        errors.push(`${link.name}'s URL is not valid`);
      }
    });

    if (errors.length > 0) {
      toast.error(errors.join(', '));
      return;
    }

    const userData = queryClient.getQueryData<User>(['my-user'])!;
    updateUserProfile({
      name: userData.name,
      handle: userData.handle,
      description: userData.description,
      image: userData.image,
      links: userData.links,
    });
  };

  const urlChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // Update the local state for UI
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );

    setDevTreeLinks(updatedLinks);

    // Get the current links from the query client to preserve order
    const currentLinks: SocialNetwork[] = JSON.parse(
      queryClient.getQueryData<User>(['my-user'])!.links
    );

    // Update only the URL of the specific link
    const updatedItems = currentLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );

    // Update the query data
    queryClient.setQueryData(['my-user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };

  const enableLinkHandler = (socialNetwork: string) => {
    let hasError = false;

    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        // in case the user wants to disable an empty or invalid url
        if (link.enabled && !isValidUrl(link.url)) {
          return { ...link, enabled: false };
        }

        // otherwise proceed with the toggle
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        }

        hasError = true;
        toast.error('URL is not valid');
      }
      return link;
    });

    if (hasError) return;

    setDevTreeLinks(updatedLinks);

    // Get the latest links from the query client
    const currentLinks = JSON.parse(
      queryClient.getQueryData<User>(['my-user'])!.links
    );

    // Find the selected social network
    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );

    // Create a new array with updated links
    let updatedItems = [...currentLinks];

    if (selectedSocialNetwork?.enabled) {
      // When enabling a link

      // Find the link in the current array
      const linkIndex = updatedItems.findIndex(
        (link) => link.name === socialNetwork
      );

      if (linkIndex !== -1) {
        // Update the existing link
        updatedItems[linkIndex].enabled = true;
      } else {
        // Add the new link
        updatedItems.push({
          ...selectedSocialNetwork,
          id: 0, // Will be assigned below
        });
      }

      // Reassign all IDs for enabled links
      let nextId = 1;
      updatedItems = updatedItems.map((link) => {
        if (link.enabled) {
          return { ...link, id: nextId++ };
        }
        return link;
      });
    } else {
      // When disabling a link

      // Find and update the link
      updatedItems = updatedItems.map((link) => {
        if (link.name === socialNetwork) {
          return { ...link, enabled: false, id: 0 };
        }
        return link;
      });

      // Reassign all IDs for enabled links
      let nextId = 1;
      updatedItems = updatedItems.map((link) => {
        if (link.enabled) {
          return { ...link, id: nextId++ };
        }
        return link;
      });
    }

    // Update the query data
    queryClient.setQueryData(['my-user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={urlChangeHandler}
            handleEnableLink={enableLinkHandler}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          onClick={saveChangesHandler}
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default LinkTreeView;
