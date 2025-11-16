import Image from 'next/image';

const Sec3 = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* Text Content */}
        <div className="text-center mb-10">
<h2
  style={{
    fontFamily: '"alliance no.2", sans-serif',
    fontSize: '50px',
    fontWeight: 500,
    lineHeight: '55px',
    color: 'rgb(191, 139, 64)',
  }}
  className="mb-4"
>
  Thick rail
</h2>

          <p className="text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
            We've kept a certain thickness on the rails to
            maintain good grip when carving, which means
            you'll be forgiven if you make a mistake with your
            grip. What's more, this will enable us to maintain
            sufficient speed to manoeuvre at all times.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/06/get-up-5.png"
            alt="Person getting up on a foil board"
            width={1024}
            height={576}
            className="object-contain w-full h-auto rounded-md"
          />
        </div>
        
      </div>
    </section>
  );
};

export default Sec3;