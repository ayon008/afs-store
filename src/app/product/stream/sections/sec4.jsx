import React from 'react';
const NavigationAdvantages = () => {
  const advantages = [
    {
      svg: <div> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M17.3137 30.8284V36.4853M17.3137 30.8284H11.6569M17.3137 30.8284L8.82844 39.3137" stroke="white" stroke-opacity="0.8" stroke-width="2.5" stroke-linecap="square"></path><path d="M31.4853 35.514V41.1708M31.4853 35.514H25.8284M31.4853 35.514L23 43.9993" stroke="white" stroke-opacity="0.8" stroke-width="2.5" stroke-linecap="square"></path><path d="M12.4853 16.514L12.4853 22.1708M12.4853 16.514L6.82842 16.514M12.4853 16.514L3.99999 24.9993" stroke="white" stroke-opacity="0.8" stroke-width="2.5" stroke-linecap="square"></path><path d="M27.4628 12.2919L32.3242 15.3855M32.3242 15.3855L35.4178 20.2469M32.3242 15.3855L26.6366 21.0732M35.8597 11.85C32.4455 8.84567 23.5295 0.819233 17.0744 5.36217C15.6867 6.33875 14 8.43656 14 8.43656C14 8.43656 19.3842 16.7721 21.7176 25.9921C30.9376 28.3256 39.2732 33.7097 39.2732 33.7097C39.2732 33.7097 41.3709 32.023 42.3475 30.6353C46.8904 24.1802 38.864 15.2643 35.8597 11.85Z" stroke="white" stroke-opacity="0.6" stroke-width="2.5" stroke-linecap="square"></path></svg></div>,

      text: 'Easy starting thanks to good power at low revs.',
    },
    {
      svg: <div><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M18 17.5332C11.8205 18.3654 4.14831 20.5354 2.99994 26.9992C2.65839 28.9217 2.99996 31.9992 2.99996 31.9992C2.99996 31.9992 14.4 34.3991 24 39.9991C33.6 34.3991 45 31.9992 45 31.9992C45 31.9992 45.3415 28.9217 44.9999 26.9992C43.8515 20.5354 36.1793 18.3654 29.9999 17.5332" stroke="white" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="square"></path><path d="M24 4V32M24 4L30 9.71429M24 4L18 9.71429" stroke="white" stroke-opacity="0.8" stroke-width="2.5" stroke-linecap="square"></path></svg></div>,
      text: 'The blocked profile provides powerful traction, ensuring incredible control and glide even when over-revved.',
    },
    {
      svg: <div><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M17 14L24 13M24 13L31 14M24 13V19M16 27.1113C9.02308 24.268 2.99996 23 2.99996 23C2.99996 23 2.65839 19.9225 2.99994 18C4.58882 9.05667 18.6666 8.33333 24 8C29.3333 8.33333 43.411 9.05671 44.9999 18C45.3415 19.9225 45 23 45 23C45 23 38.9768 24.268 31.9999 27.1113" stroke="white" stroke-opacity="0.6" stroke-width="2.5" stroke-linecap="square"></path><path d="M30 32L33 39V39.0346M30 32L27 39V39.0346M30 32V31.8655M18 32L21 39L21.0218 39.0377M18 32L15 39V39.0346M18 32V31.8655M16 32H17.0482C17.369 32 17.6874 31.9545 18 31.8655M32 32H30.9518C30.631 32 30.3126 31.9545 30 31.8655M18 31.8655C18.9187 31.6038 19.788 30.9659 20.5241 30C22.5562 27.3333 25.4438 27.3333 27.4759 30C28.212 30.9659 29.0813 31.6038 30 31.8655M21.0218 39.0377C20.7665 39 20.4523 39 20.061 39H15.939C15.5587 39 15.2513 39 15 39.0346M21.0218 39.0377C21.4133 39.0955 21.6664 39.2418 21.8476 39.6127C22.147 40.2255 21.9707 40.6161 21.6181 41.3974C20.9182 42.9483 19.5603 44 18 44C16.4397 44 15.0818 42.9483 14.3819 41.3974C14.0293 40.6161 13.853 40.2255 14.1524 39.6127C14.3369 39.235 14.5961 39.0901 15 39.0346M27 39.0346C27.2513 39 27.5587 39 27.939 39H32.061C32.4413 39 32.7487 39 33 39.0346M27 39.0346C26.5961 39.0901 26.3369 39.235 26.1524 39.6127C25.853 40.2255 26.0293 40.6161 26.3819 41.3974C27.0818 42.9483 28.4397 44 30 44C31.5603 44 32.9182 42.9483 33.6181 41.3974C33.9707 40.6161 34.147 40.2255 33.8476 39.6127C33.6631 39.235 33.4039 39.0901 33 39.0346M26 26C26 27.1046 25.1046 28 24 28C22.8954 28 22 27.1046 22 26C22 24.8954 22.8954 24 24 24C25.1046 24 26 24.8954 26 26Z" stroke="white" stroke-opacity="0.8" stroke-width="2.5" stroke-linecap="square"></path></svg></div>,
      text: 'With its smooth and stable flight characteristics, it excels in freely for downwind or surf riding. It is easy to handle during maneuvers, whether freeriding or freestyling. It naturally tilts when tacking, allowing the rider to focus fully on balance, sensations, and reading the water.',
    },
  ];

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2
  style={{
    fontFamily: '"alliance no.2", sans-serif',
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '28px',
    color: '#111111',
    marginBottom: '2.5rem', // mb-10 equivalent
  }}
>
  Its advantages in navigation:
</h2>


        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="flex-1 bg-[#111111] p-6 flex flex-col justify-between"
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '21.6px',
                color: '#FFFFFF',
              }}
            >
              {/* SVG at the top */}
              <div className="mb-4">{advantage.svg}</div>

              {/* Text at the bottom-left */}
              <div>
                <p>{advantage.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationAdvantages;
