import { Link, Outlet } from 'react-router';
import { useEffect, useState } from 'react';

import type { SocialNetwork, User } from '../types';

import DevTreeLink from '../components/DevTreeLink.tsx';
import NavigationTabs from '../components/NavigationTabs.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface DevTreeMainViewProps {
  user: User;
}

/**
 * Main view component for the DevTree application
 * Contains the profile link, main content area with Outlet, and user sidebar
 */
const DevTreeMainView = ({ user }: DevTreeMainViewProps) => {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(user.links).filter((item: SocialNetwork) => item.enabled)
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(user.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [user]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id);
      const order = arrayMove(enabledLinks, prevIndex, newIndex);

      // Reassign IDs sequentially based on the new order
      const reorderedLinks = order.map((link, index) => ({
        ...link,
        id: index + 1, // Assign sequential IDs starting from 1
      }));

      setEnabledLinks(reorderedLinks);

      const disabledLinks: SocialNetwork[] = JSON.parse(user.links).filter(
        (item: SocialNetwork) => !item.enabled
      );

      const links = reorderedLinks.concat(disabledLinks);

      queryClient.setQueryData(['my-user'], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        };
      });
    }
  };

  return (
    <>
      <NavigationTabs />

      <div className="flex justify-end">
        <Link
          className="font-bold text-right text-slate-800 text-2xl"
          to={`/profile/${user.handle}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Visit my profile /{user.handle}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-10 mt-10">
        <div className="flex-1">
          <Outlet />
        </div>

        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
          <p className="text-4xl text-center text-white">{user.handle}</p>

          {user.image && (
            <img
              src={user.image}
              alt="Imagen Perfil"
              className="mx-auto max-w-[250px]"
            />
          )}

          <p className="text-center text-lg font-black text-white">
            {user.description}
          </p>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="mt-20 flex flex-col gap-5">
              <SortableContext
                items={enabledLinks}
                strategy={verticalListSortingStrategy}
              >
                {enabledLinks.map((link) => (
                  <DevTreeLink key={link.name} link={link} />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        </div>
      </div>
    </>
  );
};

export default DevTreeMainView;
