import { LinkItem } from '@/types';
import { LinkCard } from './LinkCard';

interface LinkCardListProps {
  links: LinkItem[];
  username: string;
}

export function LinkCardList({ links, username }: LinkCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-3 w-full max-w-md">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          title={link.title}
          url={link.url}
          clickCount={link.clickCount}
          linkId={link.id}
          username={username}
        />
      ))}
    </div>
  );
}
