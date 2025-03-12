import React from 'react';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card/hover-card";

interface HoverCardComponentProps {
  triggerText: React.ReactNode; // Change to React.ReactNode to allow JSX/Icons
  contentText: React.ReactNode; // Allowing any JSX or HTML content
}

const HoverCardComponent: React.FC<HoverCardComponentProps> = ({
  triggerText,
  contentText,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{triggerText}</HoverCardTrigger>
      <HoverCardContent>{contentText}</HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardComponent;
