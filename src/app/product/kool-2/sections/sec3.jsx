import Image from 'next/image';

export default function WindsurfFriendly() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Image Column */}
          <div className="flex-1">
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2023/06/Kool-16.png"
              alt="Windsurf friendly board"
              width={1920}
              height={800}
              className="w-full h-auto max-w-2xl mx-auto"
            />
          </div>

          {/* Text Column */}
          <div className="flex-1">
            <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <h2 className="text-3xl font-semibold text-amber-600">
                Windsurf friendly
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                An Insert on the board allows you to fit a mast
                step, so you can windsurf the board if you wish.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}