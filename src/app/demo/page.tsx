import { api } from "~/trpc/server";
import "./index.css";
import { notFound } from "next/navigation";
import { type Author } from "@prisma/client";
import { BeanIcon, HopIcon } from "lucide-react";

export default async function Page() {
  const { data } = await api.author.findMany.query({
    pageSize: 8,
  });

  if (data.length === 0) return notFound();

  const author1 = data[0];
  const author2 = data[1];
  const author3 = data[2];
  const author4 = data[3];
  const author5 = data[4];
  const author6 = data[5];
  const author7 = data[6];
  const author8 = data[7];

  return (
    <div className="demo m-auto grid aspect-square h-[calc(100vh-2rem)] grid-cols-4 gap-4 pt-4">
      {author1 && <GridItemOne author={author1} />}
      {author4 && <GridItemTwo author={author4} />}

      {author5 && <GridItemFour author={author5} />}
      {author6 && <GridItemFour author={author6} />}

      {author7 && <GridItemFour author={author7} />}
      {author8 && <GridItemFour author={author8} />}
      {author2 && <GridItemOne author={author2} />}

      {author3 && <GridItemTwo author={author3} />}
    </div>
  );
}

function GridItemOne({
  author,
}: {
  author: Author & { _count: { poems: number } };
}) {
  return (
    <div className="group col-span-2 row-span-2">
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden bg-gradient-to-tl from-neutral-500 via-neutral-900 to-neutral-700 p-8 text-neutral-50">
        <h1 prose-h1="">{author.name}</h1>
        <p prose-p="" className="text-neutral-300">
          {author.introduce}
        </p>
        <div className="mt-8 grid grid-cols-3">
          <div>
            <p className="text-4xl font-bold text-blue-500">
              {author._count.poems}
            </p>
            <p className="text-neutral-300">作品</p>
          </div>
          <div>
            <p className="text-4xl font-bold">
              {author.birthDate && author.deathDate
                ? author.deathDate - author.birthDate
                : "?"}
            </p>
            <p className="text-neutral-300">享年</p>
          </div>
        </div>

        <HopIcon
          className="absolute bottom-0 right-0 h-96 w-96 text-neutral-400 opacity-5"
          strokeWidth={1}
        />
      </div>
    </div>
  );
}

function GridItemTwo({
  author,
}: {
  author: Author & { _count: { poems: number } };
}) {
  return (
    <div className="col-span-2 border bg-card text-card-foreground shadow transition-all hover:bg-accent hover:text-accent-foreground">
      <div className="absolute h-full w-full px-8 py-4">
        <h1 prose-h1="" className="!font-bold">
          {author.name}
        </h1>
        <p prose-p="" className="!text-base text-muted-foreground">
          {author.introduce}
        </p>

        <BeanIcon className="absolute bottom-0 right-0 h-52 w-52 text-muted-foreground/80 opacity-5" />
      </div>
    </div>
  );
}

function GridItemFour({
  author,
}: {
  author: Author & { _count: { poems: number } };
}) {
  return (
    <div className="relative h-full w-full border bg-card text-card-foreground shadow transition-all hover:bg-accent hover:text-accent-foreground">
      <div className="absolute left-0 top-0 h-full w-full p-4">
        <h1 prose-h1="" className="!font-bold">
          {author.name}
        </h1>
        <p prose-p="" className="!text-sm text-muted-foreground">
          {author.introduce}
        </p>
      </div>
    </div>
  );
}
