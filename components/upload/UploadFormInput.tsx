"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const UploadFormInput = ({ onSubmit }: Props) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
        />
        <Button className="text-white bg-linear-to-r from-emerald-800 to-emerald-400 hover:scale-105 transition duration-150">
          Upload your pdf
        </Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
