import type { SocialNetwork } from '../types';

type DevTreeLinkProps = {
  link: SocialNetwork;
};

const DevTreeLink = ({ link }: DevTreeLinkProps) => {
  // const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
  //   id: link.id
  // })

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition
  // }

  return (
    <li className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
      ></div>
      <p className="capitalize">
        Visit My: <span className="font-bold">{link.name}</span>
      </p>
    </li>
  );
};

export default DevTreeLink;
