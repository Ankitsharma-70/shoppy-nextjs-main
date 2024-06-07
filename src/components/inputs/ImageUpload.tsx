"use client";
import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
const ImageUpload = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (info: any) => void;
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="qczpwdza"
      options={{
        maxFiles: 1,
        showAdvancedOptions: true,
        folder: "shoppynextjs2023",
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className=" relative

                  flex
                  
                  w-full 
                  
                  cursor-pointer 
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  border-[1px]
                  border-dashed
                border-brand-100
                 p-2
                  text-gray-700 transition duration-300 ease-in-out hover:border-brand-500 hover:text-brand-500
                "
          >
            {!value && (
              <>
                <BsImage size={24} />
                <p className=" text-xs text-gray-700 group-hover:text-brand-500">
                  Click to upload
                </p>
              </>
            )}
            {value && (
              <Image
                width={100}
                height={100}
                className=" aspect-square w-14  object-contain "
                src={value}
                alt="Image"
              />
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
