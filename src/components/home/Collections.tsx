import React from "react";
import { prisma } from "~/server/db";
import Loader from "../Loader";
import Image from "next/image";

const Collections = async () => {
  const collections = await prisma.collection.findMany({
    take: 6,
  });
  if (!collections) {
    return <Loader />;
  }
  return (
    <div className=" mx-auto w-full max-w-7xl">
      <ul className="grid grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-3">
        {[...Array(6)]
          .flatMap(() => collections)
          .map((collection) => {
            return (
              <li key={collection.id}>
                <Image
                  src={collection.image.url || ""}
                  width={400}
                  height={400}
                  alt={collection.name}
                  className="aspect-square w-full  object-cover "
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Collections;
