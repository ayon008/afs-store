"use client";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Noise Background */}
      <div className="absolute inset-0 bg-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
            backgroundRepeat: "repeat",
            backgroundSize: "auto", // keep original size
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[936px] h-[131px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="936"
          height="131"
          viewBox="0 0 936 131"
          fill="none"
        >
          <path
            className="stream_svg_red"
            d="M116.433 10.6467C110.384 3.58918 99.9653 0.00427246 85.8503 0.00427246C73.0795 0.00427246 61.2052 3.02936 50.4509 8.85462C39.4726 14.9039 31.5188 23.3055 26.9258 33.8358C21.9967 44.9262 22.2207 54.1121 27.5979 61.0576C32.639 67.667 41.8248 73.2681 54.7076 77.7491C62.3252 80.7737 67.2542 83.6866 69.3827 86.3752C71.2871 88.7277 71.1753 92.0881 69.2709 96.569C68.0386 99.4817 65.574 101.834 61.7651 103.739C57.7323 105.867 53.4755 106.876 48.9946 106.876C42.6092 106.876 37.5681 105.531 33.9834 102.955C30.8467 100.714 30.6226 96.6815 33.1991 90.7443L34.5433 87.7194H5.97732L4.29669 90.4079C-2.20071 104.299 -1.30451 114.605 6.76123 121.327C14.4909 127.6 25.3574 130.848 39.1364 130.848C52.9153 130.848 64.2298 128.048 74.8721 122.447C85.7384 116.733 93.6921 108.22 98.6212 97.1297C103.662 85.7032 103.774 76.4049 99.0694 69.4594C94.5884 62.85 86.0746 57.361 73.8639 52.88C64.6779 49.4073 58.8526 46.3828 56.6121 43.9182C54.7077 41.7898 54.5957 38.7647 56.6121 34.3958C57.8444 31.5952 60.1967 29.2425 63.7815 27.2261C67.5903 25.0976 71.7353 24.0897 76.1042 24.0897C81.9295 24.0897 86.0743 25.6578 88.3148 28.6824C90.4433 31.5951 90.5554 35.4042 88.4269 40.2212L87.1948 43.134H115.761L117.441 40.4455C123.266 27.8988 123.042 17.9283 116.769 10.6467"
            fill="url(#paint0_linear_18268_450)"
          ></path>
          <path
            d="M148.808 25.882H183.087L137.605 129.057H167.292L212.774 25.882H247.725L258.255 1.79724H159.338L148.808 25.882Z"
            fill="url(#paint1_linear_18268_450)"
          ></path>
          <path
            d="M374.873 12.1033C369.271 5.2698 359.301 1.79724 345.298 1.79724H300.825L244.701 129.057H274.387L295.895 80.2142H313.147C318.524 80.2142 321.997 81.5583 323.565 84.2469C325.022 86.9354 324.574 91.0801 322.109 96.5692L318.189 105.307C316.396 109.452 314.94 113.597 313.708 117.854C312.363 122.671 312.587 126.144 314.38 128.497L314.94 129.169H343.506L345.858 123.791L345.074 122.895C344.066 121.551 343.73 119.31 344.29 116.398C344.962 112.925 345.97 109.565 347.427 106.204L351.348 97.2414C354.708 89.6237 355.829 83.0149 354.596 77.5257C353.7 73.4928 351.348 70.2435 347.651 67.779C353.14 65.3144 358.069 62.2898 362.214 58.705C367.927 53.888 372.408 47.839 375.545 40.7814C380.922 28.6828 380.698 19.0487 374.873 11.9911M319.981 25.882H335.552C341.377 25.882 345.074 27.2267 346.642 29.8033C348.211 32.3798 347.875 36.1888 345.746 41.1178C343.506 46.1589 340.369 49.7437 336.224 52.3202C332.079 54.8968 326.926 56.2408 320.877 56.2408H306.538L319.981 25.882Z"
            fill="url(#paint2_linear_18268_450)"
          ></path>
          <path
            d="M823.305 30.0274L838.876 23.3062L839.436 16.9208L824.425 23.5305L787.345 40.5577L783.984 48.0638L786.001 47.1674L823.305 30.0274Z"
            fill="url(#paint3_linear_18268_450)"
          ></path>
          <path
            d="M787.233 76.5179L767.293 86.0397L764.38 92.5373L799.78 75.8458L801.909 74.9494L804.709 68.4525L787.233 76.5179Z"
            fill="url(#paint4_linear_18268_450)"
          ></path>
          <path
            d="M787.234 67.5554L772.334 74.613L769.31 81.5584L785.889 73.6045L806.726 64.0827L809.75 57.2494L787.234 67.5554Z"
            fill="url(#paint5_linear_18268_450)"
          ></path>
          <path
            d="M829.131 12.4401L792.387 29.2437L788.914 37.0849L814.007 25.4346L839.773 14.12L840.333 7.62244L829.131 12.4401Z"
            fill="url(#paint6_linear_18268_450)"
          ></path>
          <path
            d="M802.245 6.72633L798.66 15.016L814.119 7.8463L827.674 1.79724H812.999L802.245 6.72633Z"
            fill="url(#paint7_linear_18268_450)"
          ></path>
          <path
            d="M809.19 129.057H818.824L827.898 125.024L833.387 118.19L820.056 124.128L809.19 129.057Z"
            fill="url(#paint8_linear_18268_450)"
          ></path>
          <path
            d="M862.401 114.494L855.904 117.294L853.664 122.447L890.184 106.988L892.424 101.947L862.401 114.494Z"
            fill="url(#paint9_linear_18268_450)"
          ></path>
          <path
            d="M782.641 87.6073L762.252 97.4655L759.452 103.851L785.777 91.1922L796.98 86.0388L799.78 79.7655L782.641 87.6073Z"
            fill="url(#paint10_linear_18268_450)"
          ></path>
          <path
            d="M862.402 123.455L851.087 128.385L850.751 129.057H858.817L865.426 126.144L885.367 117.854L887.607 112.925L862.402 123.455Z"
            fill="url(#paint11_linear_18268_450)"
          ></path>
          <path
            d="M771.214 129.057H778.047L779.84 124.912L771.214 129.057Z"
            fill="url(#paint12_linear_18268_450)"
          ></path>
          <path
            d="M871.924 128.385L870.244 129.057H879.654L880.662 128.609L882.79 123.904L871.924 128.385Z"
            fill="url(#paint13_linear_18268_450)"
          ></path>
          <path
            d="M797.316 18.0409L793.731 25.9942L800.004 23.0814L837.532 6.16566L840.669 4.82143L840.893 1.79724H833.052L819.721 7.73417L797.316 18.0409Z"
            fill="url(#paint14_linear_18268_450)"
          ></path>
          <path
            d="M824.65 86.2634L807.174 94.3295L806.726 99.1464L823.081 91.7525L865.538 73.1567L871.588 70.6919L877.301 63.5228L862.289 69.7962L837.98 80.4379L832.603 87.1598L833.051 82.5664L824.65 86.2634Z"
            fill="url(#paint15_linear_18268_450)"
          ></path>
          <path
            d="M804.485 1.79724L803.477 3.92573L808.07 1.79724H804.485Z"
            fill="url(#paint16_linear_18268_450)"
          ></path>
          <path
            d="M752.506 129.057H761.692L762.476 128.609L782.304 119.311L784.881 113.598L752.506 129.057Z"
            fill="url(#paint17_linear_18268_450)"
          ></path>
          <path
            d="M849.743 97.8026L855.456 90.745L820.056 106.316L805.717 112.926L805.269 117.63L823.081 109.453L849.743 97.8026Z"
            fill="url(#paint18_linear_18268_450)"
          ></path>
          <path
            d="M752.282 120.207L749.593 126.144L785.777 108.781L787.234 108.108L789.922 102.171L752.282 120.207Z"
            fill="url(#paint19_linear_18268_450)"
          ></path>
          <path
            d="M757.211 108.781L754.522 115.054L762.588 111.021L792.163 97.1305L794.851 90.9686L787.346 94.4414L757.211 108.781Z"
            fill="url(#paint20_linear_18268_450)"
          ></path>
          <path
            d="M824.65 113.037L804.933 122.111L804.597 126.704L837.196 112.029L838.989 111.245L844.59 104.299L824.65 113.037Z"
            fill="url(#paint21_linear_18268_450)"
          ></path>
          <path
            d="M870.467 84.3595L868.003 89.9607L904.411 74.8371L906.875 69.1244L904.971 69.908L870.467 84.3595Z"
            fill="url(#paint22_linear_18268_450)"
          ></path>
          <path
            d="M904.859 34.0604L862.177 51.8718L859.601 52.9925L853.439 60.8336L865.538 55.5688L908.219 37.8688L923.342 31.8198L926.143 25.6586L904.859 34.0604Z"
            fill="url(#paint23_linear_18268_450)"
          ></path>
          <path
            d="M904.859 43.0229L862.29 60.8343L848.847 66.7719L842.91 74.1652L874.948 60.3865L882.23 57.3616L882.454 57.138L882.342 57.3616L917.742 42.7986L918.638 42.4629L921.327 36.5253L904.859 43.0229Z"
            fill="url(#paint24_linear_18268_450)"
          ></path>
          <path
            d="M875.284 73.3807L872.82 78.9819L879.654 75.9577L909.228 63.971L911.692 58.2577L904.971 60.9462L875.284 73.3807Z"
            fill="url(#paint25_linear_18268_450)"
          ></path>
          <path
            d="M904.859 51.9842L880.102 62.4023L877.637 68.2278L908.22 55.4569L913.933 53.2163L916.51 47.3915L904.859 51.9842Z"
            fill="url(#paint26_linear_18268_450)"
          ></path>
          <path
            d="M899.594 85.5916L902.171 79.8783L865.763 95.1134L863.186 100.827L879.654 93.7692L899.594 85.5916Z"
            fill="url(#paint27_linear_18268_450)"
          ></path>
          <path
            d="M904.747 7.17418L891.416 12.7754L884.807 21.1772L894.105 17.2566L927.376 3.81359L932.641 1.79724H918.19L904.747 7.17418Z"
            fill="url(#paint28_linear_18268_450)"
          ></path>
          <path
            d="M933.313 4.70991L904.747 16.1359L880.885 26.1062L874.388 34.2838L908.331 20.2808L932.193 10.759L932.753 10.5347L935.665 3.92566L933.313 4.70991Z"
            fill="url(#paint29_linear_18268_450)"
          ></path>
          <path
            d="M900.042 1.79724L895.113 8.07057L910.572 1.79724H900.042Z"
            fill="url(#paint30_linear_18268_450)"
          ></path>
          <path
            d="M904.747 25.0977L870.244 39.5493L863.97 47.5026L875.06 42.7977L917.854 25.2099L928.048 21.1772L930.96 14.6796L904.747 25.0977Z"
            fill="url(#paint31_linear_18268_450)"
          ></path>
          <path
            d="M819.945 70.468L808.63 75.6207L808.182 80.9983L823.193 74.0529L834.396 69.2352L834.956 63.8583L819.945 70.468Z"
            fill="url(#paint32_linear_18268_450)"
          ></path>
          <path
            d="M807.846 85.0318L807.51 90.073L833.499 78.31L834.059 73.2694L824.649 77.3021L807.846 85.0318Z"
            fill="url(#paint33_linear_18268_450)"
          ></path>
          <path
            d="M862.289 105.532L860.833 106.204L858.480 111.693L889.175 98.5858L894.888 96.2337L897.353 90.8568L862.289 105.532Z"
            fill="url(#paint34_linear_18268_450)"
          ></path>
          <path
            d="M809.414 66.3236L808.966 71.8127L835.292 59.9382L835.852 54.4491L824.537 59.3775L809.414 66.3236Z"
            fill="url(#paint35_linear_18268_450)"
          ></path>
          <path
            d="M862.289 78.7577L824.649 95.2249L806.389 103.627L806.053 108.22L837.196 94.2171L860.833 84.1346L866.434 77.077L862.289 78.7577Z"
            fill="url(#paint36_linear_18268_450)"
          ></path>
          <path
            d="M824.425 32.4921L787.121 49.6315L782.304 51.8721L779.167 59.1539L814.007 43.0224L837.98 32.4921L838.54 26.3309L824.425 32.4921Z"
            fill="url(#paint37_linear_18268_450)"
          ></path>
          <path
            d="M824.538 50.4159L810.087 57.0256L809.639 62.739L823.306 56.4656L836.188 50.8644L836.748 45.0389L824.538 50.4159Z"
            fill="url(#paint38_linear_18268_450)"
          ></path>
          <path
            d="M824.537 41.4539L787.121 58.594L777.375 63.2988L774.239 70.3564L776.591 69.1243L813.895 51.8721L837.084 41.6782L837.644 35.7406L824.537 41.4539Z"
            fill="url(#paint39_linear_18268_450)"
          ></path>
          <path
            d="M655.045 87.7199L677.786 75.1732L679.578 74.1647L680.362 67.3314L678.794 68.1157L656.053 80.6623L648.547 84.9193L647.651 91.8647L655.045 87.7199Z"
            fill="url(#paint40_linear_18268_450)"
          ></path>
          <path
            d="M655.045 78.87L677.786 66.3234L680.587 64.867L681.259 57.8094L671.289 63.1864L649.892 75.1731L648.884 82.3428L655.045 78.87Z"
            fill="url(#paint41_linear_18268_450)"
          ></path>
          <path
            d="M655.045 96.4586L677.674 83.9113L678.57 83.4634L679.242 76.8544L671.401 81.1107L648.212 93.9937L647.315 94.5537L646.531 101.276L655.045 96.4586Z"
            fill="url(#paint42_linear_18268_450)"
          ></path>
          <path
            d="M651.124 65.4275L650.116 72.9329L655.157 70.0202L677.786 57.5857L681.595 55.5693L682.267 48.2875L671.289 54.2251L651.124 65.4275Z"
            fill="url(#paint43_linear_18268_450)"
          ></path>
          <path
            d="M677.674 92.7608L678.346 86.3754L663.895 94.2172L646.083 104.187L645.299 110.797L654.933 105.307L677.674 92.7608Z"
            fill="url(#paint44_linear_18268_450)"
          ></path>
          <path
            d="M662.663 109.788L676.666 102.171L677.338 95.8973L671.513 99.0343L648.324 111.917L644.851 113.934L644.067 120.319L662.663 109.788Z"
            fill="url(#paint45_linear_18268_450)"
          ></path>
          <path
            d="M675.657 111.468L676.33 105.419L671.512 107.996L648.324 120.879L643.618 123.567L642.946 129.056H644.067L654.821 122.895L675.657 111.468Z"
            fill="url(#paint46_linear_18268_450)"
          ></path>
          <path
            d="M608.443 105.532L617.405 93.6571L615.389 94.8892L572.819 119.758L561.169 126.704L559.376 129.056H568.45L597.465 111.916L608.443 105.532Z"
            fill="url(#paint47_linear_18268_450)"
          ></path>
          <path
            d="M667.031 1.79724H658.406L651.684 10.3112L663.11 4.03786L667.031 1.79724Z"
            fill="url(#paint48_linear_18268_450)"
          ></path>
          <path
            d="M673.753 129.057L674.313 124.464L665.911 129.057H673.753Z"
            fill="url(#paint49_linear_18268_450)"
          ></path>
          <path
            d="M647.427 21.5136L663.111 12.7754L678.01 4.59785L683.163 1.79724H668.824L655.717 9.0784L650.34 12.1033L639.474 26.1063L647.427 21.5136Z"
            fill="url(#paint50_linear_18268_450)"
          ></path>
          <path
            d="M597.577 94.2172L631.072 74.8365L632.08 74.3887L641.266 62.0663L623.566 72.148L587.046 93.4329L576.964 106.427L597.577 94.2172Z"
            fill="url(#paint51_linear_18268_450)"
          ></path>
          <path
            d="M631.072 66.0991L643.619 59.0415L653.141 46.3827L647.988 49.2954L615.165 68.0033L599.929 76.9651L589.623 90.1838L597.577 85.479L631.072 66.0991Z"
            fill="url(#paint52_linear_18268_450)"
          ></path>
          <path
            d="M674.649 120.767L675.322 114.942L671.625 116.958L649.78 129.057H659.638L674.649 120.767Z"
            fill="url(#paint53_linear_18268_450)"
          ></path>
          <path
            d="M596.68 121.103L605.306 109.677L589.959 118.639L572.371 129.057H583.237L596.68 121.103Z"
            fill="url(#paint54_linear_18268_450)"
          ></path>
          <path
            d="M593.096 125.808L587.606 129.057H590.631L593.096 125.808Z"
            fill="url(#paint55_linear_18268_450)"
          ></path>
          <path
            d="M597.465 103.067L620.318 89.9605L629.392 77.8617L615.276 85.9278L574.164 109.9L564.306 122.784L597.465 103.067Z"
            fill="url(#paint56_linear_18268_450)"
          ></path>
          <path
            d="M631.184 48.399L655.269 34.7324L677.898 22.1858L685.515 18.2645L686.3 10.1991L685.74 10.5348L671.176 18.4888L647.987 31.3711L625.247 44.3663L614.716 57.8094L631.184 48.399Z"
            fill="url(#paint57_linear_18268_450)"
          ></path>
          <path
            d="M662.999 21.6251L686.412 8.85482L687.196 1.79724H685.291L671.065 9.52694L655.829 18.0409L637.905 28.1226L627.151 41.9014L639.361 34.956L662.999 21.6251Z"
            fill="url(#paint58_linear_18268_450)"
          ></path>
          <path
            d="M655.157 52.4314L677.898 39.8848L683.499 36.8606L684.283 29.243L671.176 36.2999L653.589 46.1581L652.581 53.8878L655.157 52.4314Z"
            fill="url(#paint59_linear_18268_450)"
          ></path>
          <path
            d="M631.184 57.2493L655.269 43.582L677.898 31.1474L684.507 27.6747L685.292 19.8329L671.177 27.4504L647.988 40.3335L615.164 59.0413L612.588 60.6098L602.17 74.0529L631.184 57.2493Z"
            fill="url(#paint60_linear_18268_450)"
          ></path>
          <path
            d="M655.157 61.2825L677.898 48.7358L682.491 46.2709L683.275 38.7655L678.57 41.2297L655.941 53.7764L652.356 55.7934L651.348 63.411L655.157 61.2825Z"
            fill="url(#paint61_linear_18268_450)"
          ></path>
          <path
            d="M467.517 55.3448L474.126 51.4242H469.757L473.23 43.5824L468.077 46.6073L441.751 62.8509L432.453 68.5636L427.412 80.1024L467.517 55.3448Z"
            fill="url(#paint62_linear_18268_450)"
          ></path>
          <path
            d="M438.279 55.3448L433.237 66.8836L441.191 61.9545L473.902 41.9018L479.055 30.3636L438.279 55.3448Z"
            fill="url(#paint63_linear_18268_450)"
          ></path>
          <path
            d="M482.08 74.8369L497.427 65.5394L512.998 56.129L515.127 51.4242H507.173L497.987 56.9133L482.64 66.3236L468.077 75.1733L467.741 75.3975H481.183L482.08 74.8369Z"
            fill="url(#paint64_linear_18268_450)"
          ></path>
          <path
            d="M507.733 68.1155L512.326 57.8094L497.987 66.4348L483.2 75.3973H495.635L507.733 68.1155Z"
            fill="url(#paint65_linear_18268_450)"
          ></path>
          <path
            d="M497.987 18.8245L486.449 25.882H500.228L529.802 7.95843L540.108 1.79724H526.105L497.987 18.8245Z"
            fill="url(#paint66_linear_18268_450)"
          ></path>
          <path
            d="M535.067 25.098L533.835 25.8823H534.731L535.067 25.098Z"
            fill="url(#paint67_linear_18268_450)"
          ></path>
          <path
            d="M461.355 105.083H449.369L447.912 105.98L410.608 129.057H422.595L429.54 124.8L461.355 105.083Z"
            fill="url(#paint68_linear_18268_450)"
          ></path>
          <path
            d="M482.08 65.4272L497.427 56.129L505.269 51.4242H491.602L482.64 56.8011L468.077 65.7629L441.751 81.8944L424.835 92.4247L420.914 94.7775L415.874 106.204L424.275 100.939L441.191 90.5205L456.762 80.9987L459.227 75.3975H465.724L467.517 74.2769L482.08 65.4272Z"
            fill="url(#paint69_linear_18268_450)"
          ></path>
          <path
            d="M441.751 72.4848L426.628 81.7823L421.699 93.0969L424.275 91.529L453.85 73.269L482.08 55.9048L489.585 51.4242H476.143L468.077 56.2411L441.751 72.4848Z"
            fill="url(#paint70_linear_18268_450)"
          ></path>
          <path
            d="M506.837 70.0199L497.987 75.3975H504.484L506.837 70.0199Z"
            fill="url(#paint71_linear_18268_450)"
          ></path>
          <path
            d="M518.151 25.882H531.818L535.851 23.5299L540.668 12.3275L530.362 18.4887L518.151 25.882Z"
            fill="url(#paint72_linear_18268_450)"
          ></path>
          <path
            d="M502.244 25.882H516.135L529.802 17.5923L541.453 10.6469L545.261 1.79724H542.125L530.362 8.85482L502.244 25.882Z"
            fill="url(#paint73_linear_18268_450)"
          ></path>
          <path
            d="M468.077 17.8166L449.929 29.019L444.888 40.5572L453.849 34.956L467.516 26.5541L482.08 17.7045L497.427 8.29415L508.181 1.79724H494.29L482.64 8.96627L468.077 17.8166Z"
            fill="url(#paint74_linear_18268_450)"
          ></path>
          <path
            d="M441.079 108.781L447.128 105.084H446.008L450.265 95.5619L441.751 100.827L424.835 111.245L409.376 120.879L405.791 129.057H408.368L414.641 125.136L441.079 108.781Z"
            fill="url(#paint75_linear_18268_450)"
          ></path>
          <path
            d="M455.754 15.8003L450.713 27.3384L467.517 16.9202L482.08 8.07057L492.274 1.79724H478.495L468.077 8.1827L455.754 15.8003Z"
            fill="url(#paint76_linear_18268_450)"
          ></path>
          <path
            d="M441.191 99.9311L450.937 93.9935L455.978 82.5668L441.751 91.4171L424.835 101.835L415.201 107.884L410.16 119.199L424.275 110.461L441.191 99.9311Z"
            fill="url(#paint77_linear_18268_450)"
          ></path>
          <path
            d="M425.171 129.057H436.822L474.574 105.868L475.806 105.083H464.044L430.213 125.92L425.171 129.057Z"
            fill="url(#paint78_linear_18268_450)"
          ></path>
          <path
            d="M467.517 7.28632L476.591 1.79724H461.916L456.539 14.1196L467.517 7.28632Z"
            fill="url(#paint79_linear_18268_450)"
          ></path>
          <path
            d="M482.64 18.4887L468.077 27.4505L444.103 42.1257L439.062 53.6645L441.190 52.4317L467.516 36.1887L479.727 28.6826L480.959 25.882H484.432L497.427 17.9287L524.089 1.79724H510.197L482.64 18.4887Z"
            fill="url(#paint80_linear_18268_450)"
          ></path>
          <path
            d="M490.146 105.083H478.719L439.735 129.057H451.049L490.146 105.083Z"
            fill="url(#paint81_linear_18268_450)"
          ></path>
          <path
            d="M498.211 109.005L499.892 105.083H493.506L454.522 128.832L454.298 129.057H465.388L498.211 109.005Z"
            fill="url(#paint82_linear_18268_450)"
          ></path>
          <path
            d="M496.867 112.141L468.861 129.057H479.839L492.834 121.103L496.867 112.141Z"
            fill="url(#paint83_linear_18268_450)"
          ></path>
          <path
            d="M491.378 124.464L483.76 129.057H489.361L491.378 124.464Z"
            fill="url(#paint84_linear_18268_450)"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_18268_450"
              x1="-0.00604174"
              y1="65.4263"
              x2="7203.12"
              y2="68.7398"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint1_linear_18268_450"
              x1="-1067.21"
              y1="65.4264"
              x2="6195.81"
              y2="68.7028"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint2_linear_18268_450"
              x1="-1699.61"
              y1="65.3688"
              x2="4805.07"
              y2="67.9991"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint3_linear_18268_450"
              x1="-13228.7"
              y1="203.801"
              x2="2573.88"
              y2="207.597"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint4_linear_18268_450"
              x1="-17734.6"
              y1="-16.4272"
              x2="3993.93"
              y2="-10.8772"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint5_linear_18268_450"
              x1="-17799.5"
              y1="44.0209"
              x2="3868.82"
              y2="49.5916"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint6_linear_18268_450"
              x1="-14355.9"
              y1="256.717"
              x2="2686.06"
              y2="260.894"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint7_linear_18268_450"
              x1="-25755.9"
              y1="629.83"
              x2="4445.94"
              y2="635.715"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint8_linear_18268_450"
              x1="-31290.4"
              y1="-635.332"
              x2="4923.83"
              y2="-628.377"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint9_linear_18268_450"
              x1="-20607.5"
              y1="-233.084"
              x2="2000.25"
              y2="-227.97"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint10_linear_18268_450"
              x1="-17620.2"
              y1="-77.8936"
              x2="4108.29"
              y2="-72.3436"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint11_linear_18268_450"
              x1="-21598.3"
              y1="-385.259"
              x2="2177.55"
              y2="-380.808"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint12_linear_18268_450"
              x1="-83656.2"
              y1="-1877.79"
              x2="17931.7"
              y2="-1856.91"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint13_linear_18268_450"
              x1="-64898.8"
              y1="-1484.79"
              x2="4942.92"
              y2="-1472.52"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint14_linear_18268_450"
              x1="-15747.3"
              y1="344.076"
              x2="2832.94"
              y2="348.153"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint15_linear_18268_450"
              x1="-10695.5"
              y1="6.9991"
              x2="1720.84"
              y2="9.67955"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint16_linear_18268_450"
              x1="-163683"
              y1="3911.55"
              x2="27104.1"
              y2="3949.37"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint17_linear_18268_450"
              x1="-21748.4"
              y1="-407.698"
              x2="5318.32"
              y2="-402.171"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint18_linear_18268_450"
              x1="-15013.3"
              y1="-123.207"
              x2="2447.09"
              y2="-119.207"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint19_linear_18268_450"
              x1="-17391.5"
              y1="-200.542"
              x2="4337.01"
              y2="-195.018"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint20_linear_18268_450"
              x1="-17505.9"
              y1="-138.751"
              x2="4222.65"
              y2="-133.201"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint21_linear_18268_450"
              x1="-18824.5"
              y1="-227.01"
              x2="3086.58"
              y2="-221.76"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint22_linear_18268_450"
              x1="-20893.2"
              y1="-23.2099"
              x2="1649.34"
              y2="-18.042"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint23_linear_18268_450"
              x1="-10983.5"
              y1="147.933"
              x2="1069.27"
              y2="150.427"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint24_linear_18268_450"
              x1="-10057.7"
              y1="100.474"
              x2="1117.01"
              y2="102.768"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint25_linear_18268_450"
              x1="-21009.2"
              y1="45.2692"
              x2="1533.39"
              y2="50.4094"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint26_linear_18268_450"
              x1="-21125.1"
              y1="113.262"
              x2="1417.44"
              y2="118.43"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint27_linear_18268_450"
              x1="-20717.6"
              y1="-90.2572"
              x2="1760.21"
              y2="-85.0914"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint28_linear_18268_450"
              x1="-17307.5"
              y1="429.597"
              x2="1011.64"
              y2="432.771"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint29_linear_18268_450"
              x1="-13351.5"
              y1="265.072"
              x2="948.785"
              y2="268.102"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint30_linear_18268_450"
              x1="-54176.7"
              y1="1327.14"
              x2="2506.44"
              y2="1336.98"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint31_linear_18268_450"
              x1="-12067.3"
              y1="202.299"
              x2="1013.38"
              y2="205.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint32_linear_18268_450"
              x1="-28243.9"
              y1="11.9769"
              x2="4485.22"
              y2="20.938"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint33_linear_18268_450"
              x1="-28458.6"
              y1="-61.0564"
              x2="4546.76"
              y2="-52.1222"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint34_linear_18268_450"
              x1="-20664"
              y1="-159.682"
              x2="1878.53"
              y2="-154.514"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint35_linear_18268_450"
              x1="-28153.5"
              y1="82.7316"
              x2="4439.24"
              y2="91.7343"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint36_linear_18268_450"
              x1="-12490.8"
              y1="-48.9445"
              x2="2021.79"
              y2="-45.7432"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint37_linear_18268_450"
              x1="-12279.2"
              y1="155.856"
              x2="2479.82"
              y2="159.346"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint38_linear_18268_450"
              x1="-27944.1"
              y1="150.723"
              x2="4379.36"
              y2="159.749"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint39_linear_18268_450"
              x1="-11425.4"
              y1="112.217"
              x2="2394.83"
              y2="115.444"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint40_linear_18268_450"
              x1="-18525.6"
              y1="-10.1525"
              x2="8262.95"
              y2="-1.55963"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint41_linear_18268_450"
              x1="-18753.6"
              y1="40.6317"
              x2="8313.11"
              y2="49.4039"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint42_linear_18268_450"
              x1="-18493.6"
              y1="-61.2165"
              x2="8295"
              y2="-52.6628"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint43_linear_18268_450"
              x1="-18920.1"
              y1="91.0004"
              x2="8335.18"
              y2="99.9359"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint44_linear_18268_450"
              x1="-18270.6"
              y1="-112.234"
              x2="8245.53"
              y2="-103.853"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint45_linear_18268_450"
              x1="-18112.9"
              y1="-163.251"
              x2="8224.66"
              y2="-154.983"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint46_linear_18268_450"
              x1="-18020.8"
              y1="-221.376"
              x2="8228.46"
              y2="-213.427"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint47_linear_18268_450"
              x1="-9019.65"
              y1="-104.34"
              x2="6081.26"
              y2="-100.4"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint48_linear_18268_450"
              x1="-39731.2"
              y1="977.892"
              x2="17365.7"
              y2="991.439"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint49_linear_18268_450"
              x1="-74160"
              y1="-1681.82"
              x2="30136.9"
              y2="-1657.44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint50_linear_18268_450"
              x1="-13695.3"
              y1="342.49"
              x2="6361.76"
              y2="347.263"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint51_linear_18268_450"
              x1="-8395.61"
              y1="9.91671"
              x2="5232.04"
              y2="13.9377"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint52_linear_18268_450"
              x1="-8685.73"
              y1="56.8931"
              x2="5110.16"
              y2="60.9619"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint53_linear_18268_450"
              x1="-23803.8"
              y1="-458.988"
              x2="10504.4"
              y2="-450.88"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint54_linear_18268_450"
              x1="-16260.9"
              y1="-298.744"
              x2="10345.4"
              y2="-292.048"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint55_linear_18268_450"
              x1="-100163"
              y1="-2431.89"
              x2="59475.6"
              y2="-2391.48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint56_linear_18268_450"
              x1="-8112.48"
              y1="-36.2144"
              x2="5350.98"
              y2="-32.2402"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint57_linear_18268_450"
              x1="-8035.05"
              y1="151.783"
              x2="4206.37"
              y2="155.266"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint58_linear_18268_450"
              x1="-9772.87"
              y1="207.601"
              x2="4820.91"
              y2="211.769"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint59_linear_18268_450"
              x1="-19260.3"
              y1="192.107"
              x2="8380.26"
              y2="201.297"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint60_linear_18268_450"
              x1="-6778.44"
              y1="110.032"
              x2="3763.7"
              y2="112.973"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint61_linear_18268_450"
              x1="-19089"
              y1="141.554"
              x2="8357.56"
              y2="150.615"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint62_linear_18268_450"
              x1="-8561.05"
              y1="78.2699"
              x2="10197.4"
              y2="84.5419"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint63_linear_18268_450"
              x1="-8847.47"
              y1="125.631"
              x2="10277.9"
              y2="132.15"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint64_linear_18268_450"
              x1="-9235.93"
              y1="76.4319"
              x2="9256.43"
              y2="80.4331"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint65_linear_18268_450"
              x1="-15522.8"
              y1="56.6756"
              x2="14562.9"
              y2="64.4455"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint66_linear_18268_450"
              x1="-8482.37"
              y1="345.676"
              x2="7848.04"
              y2="348.811"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint67_linear_18268_450"
              x1="-405349"
              y1="6729.13"
              x2="305766"
              y2="6922.68"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint68_linear_18268_450"
              x1="-7570.88"
              y1="-216.439"
              x2="9696.82"
              y2="-212.95"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint69_linear_18268_450"
              x1="-4352.87"
              y1="33.4511"
              x2="5449.48"
              y2="36.0201"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint70_linear_18268_450"
              x1="-5812.28"
              y1="43.9707"
              x2="7095.76"
              y2="47.3596"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint71_linear_18268_450"
              x1="-52651"
              y1="-111.758"
              x2="46365.1"
              y2="-86.0274"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint72_linear_18268_450"
              x1="-21531.6"
              y1="512.567"
              x2="17385.2"
              y2="522.587"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint73_linear_18268_450"
              x1="-10924.4"
              y1="345.676"
              x2="9446.05"
              y2="350.554"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint74_linear_18268_450"
              x1="-6576.86"
              y1="214.8"
              x2="7267.87"
              y2="218.427"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint75_linear_18268_450"
              x1="-8537.47"
              y1="-117.712"
              x2="11166"
              y2="-111.365"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint76_linear_18268_450"
              x1="-10147.1"
              y1="325.967"
              x2="10937.2"
              y2="331.509"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint77_linear_18268_450"
              x1="-8376.2"
              y1="-61.2164"
              x2="10749.2"
              y2="-54.6766"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint78_linear_18268_450"
              x1="-7856.74"
              y1="-216.439"
              x2="9449.17"
              y2="-212.934"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint79_linear_18268_450"
              x1="-21303"
              y1="675.636"
              x2="22396.9"
              y2="687.121"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint80_linear_18268_450"
              x1="-4831.71"
              y1="160.522"
              x2="5474.31"
              y2="163.21"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint81_linear_18268_450"
              x1="-8161.96"
              y1="-216.439"
              x2="9220.86"
              y2="-212.903"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint82_linear_18268_450"
              x1="-9323.14"
              y1="-216.439"
              x2="9896.19"
              y2="-212.117"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint83_linear_18268_450"
              x1="-15664.6"
              y1="-361.334"
              x2="15624.5"
              y2="-353.251"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
            <linearGradient
              id="paint84_linear_18268_450"
              x1="0.000412858"
              y1="65.4313"
              x2="936.52"
              y2="65.4874"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0.6"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Left Foil */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[45vw] h-auto">
        <img
          src="https://afs-foiling.com/wp-content/uploads/2025/07/pp_red0002-4.png.webp"
          alt="Stream Red"
          className="w-full h-auto object-contain"
          style={{ transform: "translateX(-12%)" }}
        />
      </div>

      {/* Right Foil */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45vw] h-auto">
        <img
          src="https://afs-foiling.com/wp-content/uploads/2025/07/pp_blue0006-1.png.webp"
          alt="Stream Blue"
          className="w-full h-auto object-contain"
          style={{ transform: "translateX(12%)" }}
        />
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl font-medium tracking-widest">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="441"
          height="98"
          viewBox="0 0 441 98"
          fill="none"
        >
          <path
            d="M85.2331 25.2089L69.9941 25.0152L66.4028 34.6243H63.4907L76.5943 0.0698853H79.3121L91.5421 34.9152H88.63L85.3299 25.2089H85.2331ZM70.8676 22.4914L84.2624 22.6852L77.8562 4.24353H77.759L70.8676 22.5886V22.4914Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M109.499 32.6836L127.358 32.8779V35.3045L106.587 35.1102L106.975 0.458557H109.887L109.499 32.6836Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M146.091 33.1684L163.951 33.3627V35.7893L143.18 35.4979L143.568 0.846252H146.48L146.091 33.1684Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M204.329 20.5505L204.135 36.1775H201.321L201.709 1.52594H213.259C216.948 1.72007 219.859 2.49676 221.801 4.14683C223.742 5.79691 224.713 8.22339 224.713 11.3294C224.713 13.1736 224.13 14.8238 223.063 16.2797C221.995 17.7357 220.442 18.7064 218.501 19.3858C220.636 19.9682 222.189 20.9387 223.063 22.2976C223.936 23.7535 224.422 25.4034 224.422 27.5388V30.742C224.422 31.8097 224.422 32.7802 224.713 33.6538C224.907 34.5274 225.392 35.2071 225.975 35.7895V36.3719H223.063C222.48 35.7895 222.092 35.013 221.898 33.9453C221.704 32.8776 221.607 31.8097 221.607 30.742V27.5388C221.607 25.4034 221.024 23.7537 219.665 22.4919C218.306 21.2301 216.365 20.6476 213.939 20.5505H204.329ZM204.427 18.1239H212.774C215.88 18.221 218.209 17.6387 219.665 16.3769C221.121 15.1151 221.898 13.4648 221.898 11.3294C221.898 8.99989 221.218 7.25288 219.762 5.99106C218.307 4.72924 216.171 4.14674 213.259 4.04968H204.621L204.427 18.0268V18.1239Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M268.585 22.3947C268.585 26.8596 267.226 30.4508 264.8 33.1686C262.276 35.8864 258.976 37.2456 254.899 37.1485C250.823 37.1485 247.619 35.6926 245.193 32.8777C242.766 30.0629 241.602 26.471 241.699 22.0061V16.3769C241.796 11.912 243.057 8.32078 245.484 5.60302C247.911 2.88525 251.211 1.52594 255.287 1.52594C259.461 1.52594 262.664 2.98191 265.091 5.79674C267.518 8.61157 268.682 12.2029 268.682 16.6678V22.2976L268.585 22.3947ZM265.77 16.7649C265.77 12.9795 264.897 9.97048 263.052 7.64096C261.208 5.31145 258.588 4.14683 255.19 4.14683C251.89 4.14683 249.27 5.2142 247.425 7.44665C245.581 9.6791 244.61 12.6886 244.61 16.474V22.2004C244.513 25.9859 245.387 28.9949 247.231 31.3244C249.076 33.6539 251.599 34.8185 254.899 34.8185C258.296 34.8185 260.917 33.7511 262.858 31.5187C264.8 29.2862 265.77 26.2773 265.77 22.3947V16.6678V16.7649Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M310.225 2.78764L309.934 25.7915C309.934 29.577 308.672 32.5864 306.343 34.7218C304.013 36.8572 301.004 37.8273 297.316 37.8273C293.724 37.8273 290.716 36.6628 288.483 34.5275C286.251 32.3921 285.086 29.3833 285.183 25.5978L285.474 2.59332H288.289L287.998 25.6944C287.998 28.7033 288.872 31.0334 290.619 32.8776C292.366 34.6247 294.598 35.4979 297.413 35.595C300.228 35.595 302.557 34.8184 304.401 33.0713C306.246 31.3241 307.119 28.9948 307.216 25.9859L307.508 2.98195H310.322L310.225 2.78764Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M353.515 37.9245L350.603 37.8273L331.288 8.02947H331.191L330.802 37.6336H327.988L328.376 2.98199H331.191L350.603 32.7804H350.7L351.089 3.17631L353.904 3.27288L353.515 37.9245Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M372.152 38.1189L372.54 3.46735H383.12C387.391 3.66147 390.885 5.11763 393.602 7.93246C396.32 10.7473 397.679 14.4357 397.679 18.9006V23.3652C397.582 27.8301 396.126 31.4213 393.311 34.139C390.496 36.9539 387.002 38.3132 382.731 38.2161H372.152V38.1189ZM375.355 5.89392L375.063 35.6924H382.731C386.129 35.7894 389.041 34.6249 391.273 32.2954C393.505 29.9659 394.67 26.8593 394.67 23.268V18.7063C394.767 15.115 393.7 12.1061 391.467 9.67953C389.235 7.25295 386.42 5.99108 383.023 5.99108H375.355V5.89392Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M7.77663 79.9525V92.4734H0.690918L1.07925 57.8218H14.28C18.2596 58.016 21.3656 59.0839 23.6951 61.1222C25.9276 63.1606 27.0923 65.8785 26.9952 69.1786C26.9952 72.4788 25.8303 75.1966 23.5008 77.1379C21.1713 79.1762 18.0653 80.0497 14.0857 80.0497H7.77663V79.9525ZM7.77663 74.517H14.0857C16.0269 74.6141 17.4828 74.1285 18.5505 73.0608C19.5211 71.9931 20.1035 70.6345 20.1035 69.0815C20.1035 67.4314 19.6183 66.0726 18.6477 64.9078C17.677 63.8401 16.2213 63.2573 14.28 63.2573H7.97065L7.87379 74.6142L7.77663 74.517Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M61.4525 77.8168L48.5432 77.7203L48.4461 87.6203L63.7819 87.8146L63.6851 93.153L41.4575 92.8621L41.8459 58.2105L64.0731 58.4042L63.9762 63.8403L48.7373 63.646L48.6401 72.3813L61.4525 72.4785V77.8168Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M85.427 79.468L85.2329 93.3479H78.2444L78.6324 58.5992L90.6684 58.7935C94.648 58.7935 97.6568 59.7639 99.8893 61.6081C102.122 63.4523 103.189 65.9762 103.189 69.1793C103.189 70.9265 102.704 72.4792 101.733 73.741C100.763 75.0028 99.404 76.0706 97.5598 76.8471C99.5982 77.5265 101.054 78.4972 101.928 79.9532C102.801 81.4091 103.286 83.1561 103.189 85.1944V87.7181C103.189 88.6887 103.189 89.6593 103.481 90.727C103.772 91.7947 104.16 92.5712 104.84 93.0565V93.5423H97.657C96.9776 92.9599 96.5894 92.0861 96.4923 90.9214C96.2982 89.7566 96.2009 88.5915 96.298 87.5238V85.0972C96.298 83.3501 95.9099 81.9914 94.9392 81.0207C93.9686 80.0501 92.7068 79.5651 90.9596 79.5651H85.427V79.468ZM85.5241 74.1296H90.4741C92.4154 74.1296 93.8715 73.838 94.8421 73.0615C95.8127 72.285 96.298 71.0231 96.298 69.373C96.298 67.82 95.8128 66.5587 94.9392 65.588C93.9686 64.6174 92.6095 64.1319 90.7653 64.1319H85.7181L85.621 74.1296H85.5241Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M139.588 79.5653L126.29 79.4681L126.096 93.8333L119.108 93.7361L119.496 59.0845L142.209 59.376V64.7144L126.388 64.52L126.29 74.0326L139.588 74.2264V79.5653Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M184.237 80.2437C184.237 84.5145 182.781 88.0089 180.064 90.7267C177.346 93.4445 173.852 94.8032 169.581 94.8032C165.31 94.8032 161.816 93.3478 159.195 90.533C156.574 87.7182 155.216 84.2236 155.313 79.9529V73.7407C155.41 69.4699 156.769 65.9755 159.486 63.2577C162.204 60.5399 165.698 59.1812 169.872 59.1812C174.143 59.1812 177.637 60.6372 180.355 63.452C182.976 66.2668 184.334 69.7614 184.237 74.0322V80.2437ZM177.346 73.935C177.346 71.2172 176.763 68.9848 175.405 67.2376C174.046 65.4905 172.202 64.6167 169.872 64.6167C167.543 64.6167 165.698 65.3933 164.34 67.1405C162.981 68.8876 162.301 71.0229 162.301 73.7407V80.05C162.204 82.7678 162.786 85.0003 164.145 86.7474C165.407 88.4945 167.251 89.3677 169.581 89.3677C172.008 89.3677 173.852 88.5917 175.211 86.8446C176.569 85.0974 177.249 82.8649 177.249 80.1472V73.8378L177.346 73.935Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M206.368 80.9234L206.174 94.8034H199.185L199.573 60.0552H211.609C215.589 60.2494 218.598 61.2199 220.83 62.967C223.063 64.8112 224.13 67.3345 224.13 70.5376C224.13 72.2848 223.645 73.8381 222.674 75.0999C221.704 76.3617 220.345 77.4295 218.501 78.206C220.539 78.8854 221.995 79.8561 222.868 81.3121C223.742 82.768 224.227 84.515 224.13 86.5533V89.077C224.13 90.0476 224.13 91.0182 224.422 92.0859C224.713 93.1536 225.101 93.93 225.78 94.4154V94.9006H218.598C218.015 94.4152 217.53 93.5416 217.433 92.3768C217.239 91.2121 217.142 90.0475 217.239 88.9799V86.5533C217.239 84.8061 216.851 83.4474 215.88 82.4768C214.909 81.5062 213.647 81.0206 211.9 81.0206H206.368V80.9234ZM206.465 75.4879H211.415C213.356 75.4879 214.812 75.1968 215.783 74.3232C216.753 73.5467 217.239 72.2849 217.239 70.6348C217.239 69.0818 216.753 67.7233 215.88 66.8498C214.909 65.8791 213.55 65.3936 211.706 65.3936H206.659L206.562 75.3908L206.465 75.4879Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M258.102 86.1649L258.297 86.262L267.518 60.7344L276.544 60.831L276.156 95.5797L269.168 95.4826L269.459 71.7991H269.362L260.529 95.386L255.773 95.2888L247.425 71.5083H247.328L247.037 95.1917L240.146 95.0945L240.534 60.4429L249.658 60.5401L258.102 86.1649Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M310.905 88.4945H299.646L297.219 95.7742H289.939L301.975 61.1226H309.061L320.32 95.9685H313.04L310.808 88.3973L310.905 88.4945ZM301.393 82.8647H309.255L305.566 70.7318H305.372L301.393 82.8647Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M361.474 96.5505L354.583 96.4534L340.8 72.8671L340.703 72.9637L340.412 96.2591L333.52 96.1619L333.909 61.5103L340.8 61.6075L354.486 85.0966H354.68L354.971 61.8018H361.863L361.474 96.5505Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M403.794 85.4852C403.794 89.3677 402.629 92.1823 400.3 94.3177C397.97 96.356 394.767 97.4237 390.69 97.3266C386.517 97.3266 383.217 95.8707 380.693 93.153C378.169 90.4352 376.907 86.9409 377.004 82.7672V75.8761C377.102 71.6053 378.46 68.2081 380.984 65.5874C383.508 62.9667 386.808 61.6076 390.787 61.7046C395.058 61.7046 398.261 62.7725 400.688 64.9079C403.017 67.0433 404.182 69.9548 404.085 73.6432V73.8375H397.291C397.291 71.6051 396.805 69.9549 395.738 68.8872C394.67 67.8195 393.02 67.2373 390.787 67.2373C388.749 67.2373 387.099 68.0138 385.934 69.6639C384.769 71.3139 384.09 73.4492 384.09 76.1669V83.0586C383.993 85.6793 384.575 87.9116 385.837 89.5617C387.002 91.2118 388.749 92.0855 390.884 92.1826C392.923 92.1826 394.476 91.6969 395.544 90.6292C396.611 89.5615 397.096 87.9119 397.096 85.5824H403.794V85.4852Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
          <path
            d="M438.348 82.1855L425.536 81.9918L425.439 91.8918L440.678 92.0861L440.581 97.4245L418.353 97.1336L418.742 62.482L440.969 62.7729L440.872 68.1112L425.633 67.9175L425.536 76.6528L438.445 76.75L438.348 82.1855Z"
            fill="white"
            fill-opacity="0.6"
          ></path>
        </svg>
      </div>

      {/* Chat Icon */}
    </div>
  );
}
