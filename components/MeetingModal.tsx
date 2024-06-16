import React, { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleClick?: () => void;
  title: string;
  buttonText?: string;
  className?: string;
  children?: ReactNode;
  buttonIcon?: string;
  buttonClassName?: string;
  image?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  handleClick,
  title,
  buttonText,
  className,
  children,
  buttonClassName,
  buttonIcon,
  image,
}: MeetingModalProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex flex-col w-full max-w-[520px] gap-6 border-none bg-dark-1 px-6  py-9 text-white">
          <div className="flex flex-col gap-6">
            {image && (
              <Image src={image} alt="" width={72} height={72} className="self-center"/>
            )}
            <h1 className={cn("text-3xl font-bold leading-[42px] text-center", className)}>
              {title}
            </h1>
            {children}
            <Button
              className={cn(
                "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0",
                buttonClassName
              )}
              onClick={handleClick}
            >{buttonIcon && (
              <Image src={buttonIcon} alt="button icon" width={13} height={13} />
            )}
            &nbsp;
              {buttonText || "Schedule Meeting"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingModal;
