"use client";

import qs from "query-string";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/useModalStore";
import { Button } from "../ui/button";
import { useState } from "react";

const DeleteMessageModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const apiUrl = data?.apiUrl;
  const query = data?.query;

  const isModalOpen = isOpen && type === "deleteMessage";

  //leave server
  const handleDeleteChannel = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.delete(url);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6 ">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Message
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure, you want to do this? <br />
              The message will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button disabled={isLoading} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={handleDeleteChannel}
                variant="primary"
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteMessageModal;
