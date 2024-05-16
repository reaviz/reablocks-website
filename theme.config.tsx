import { Pre, Code } from "nextra/components";
import { useRouter } from "next/router";
import { DocsThemeConfig } from "nextra-theme-docs";
import Link from "next/link";

// eslint-disable-next-line import/no-anonymous-default-export
const config: DocsThemeConfig = {
  logo: (
    <svg
      className="h-fit w-[150px] text-[var(--foreground-rgb)]"
      width="815"
      height="160"
      viewBox="0 0 815 160"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M98.7172 59.4333C98.7172 65.9982 89.2671 69.5405 80.378 69.5405C71.4878 69.5405 62.0403 65.9983 62.0412 59.4334V47.044C62.0412 46.2237 62.188 45.4502 62.4635 44.7259C64.3929 39.6488 72.5997 36.9356 80.3769 36.9356H80.3787C81.1935 36.9356 82.011 36.9657 82.8268 37.0249H82.8286C83.6461 37.084 84.4538 37.1733 85.2605 37.2905C87.2503 37.5818 89.1753 38.0539 90.9192 38.6968C91.201 38.8017 91.4792 38.911 91.7512 39.0238C91.8061 39.0472 91.8619 39.0695 91.9177 39.093C92.1644 39.1979 92.4057 39.3083 92.6425 39.4199C92.6888 39.4436 92.7358 39.466 92.7839 39.489C92.8152 39.5039 92.847 39.5191 92.8793 39.5349C93.0918 39.6398 93.3015 39.7481 93.5077 39.8597C93.5355 39.875 93.5634 39.8902 93.5914 39.9056C93.6617 39.944 93.7326 39.9827 93.8021 40.0226C93.9831 40.1253 94.1623 40.2302 94.3369 40.3396C94.4486 40.4099 94.562 40.4836 94.671 40.5572C94.689 40.5693 94.7072 40.5814 94.7254 40.5936C94.8568 40.6813 94.991 40.7709 95.1175 40.863C95.2303 40.9447 95.3381 41.029 95.4453 41.1128L95.4885 41.1465C95.5164 41.1686 95.5443 41.1906 95.5723 41.2126C95.6645 41.2852 95.7566 41.3577 95.845 41.4322C95.9882 41.5539 96.1233 41.68 96.2574 41.8072C96.2924 41.8406 96.3287 41.8734 96.3652 41.9063C96.4142 41.9505 96.4635 41.9949 96.5104 42.0416C96.7202 42.2548 96.9174 42.4713 97.101 42.6956C97.3576 43.0104 97.5863 43.334 97.7862 43.6733C98.186 44.3497 98.4642 45.0762 98.6082 45.8474C98.6803 46.237 98.7172 46.6332 98.7172 47.0439V59.4333ZM80.3808 65.6845C89.676 65.6845 95.6074 61.9824 95.6074 59.4333V52.8342C92.0989 55.6588 86.1294 57.1477 80.3808 57.1499V65.6845ZM65.3947 46.0996C65.32 46.2525 65.257 46.4054 65.2173 46.5539C65.1723 46.7202 65.149 46.8855 65.1508 47.044C65.1508 47.1835 65.1787 47.3275 65.212 47.4748C65.2221 47.5198 65.237 47.5639 65.2522 47.6088L65.2552 47.6177C65.2867 47.7181 65.3299 47.8219 65.3767 47.9246C65.3853 47.9423 65.3933 47.9604 65.4014 47.9788C65.4173 48.0148 65.4336 48.0517 65.4551 48.0886C65.5244 48.2159 65.6072 48.3442 65.7 48.4714C65.7702 48.5663 65.8512 48.6634 65.9332 48.7605C65.9588 48.7922 65.986 48.8233 66.0137 48.8547C66.021 48.8631 66.0284 48.8715 66.0358 48.8799C66.9541 49.9011 68.5729 50.9268 70.7761 51.736C70.8164 51.7509 70.8579 51.7655 70.8998 51.7803C70.9394 51.7943 70.9794 51.8084 71.0192 51.823C71.4288 51.9703 71.8628 52.1065 72.3139 52.2359C72.34 52.2437 72.3656 52.2515 72.391 52.2593C72.4392 52.2741 72.4867 52.2887 72.5362 52.3018C73.0629 52.4469 73.6085 52.5797 74.183 52.6969C74.2114 52.7023 74.2411 52.7074 74.2711 52.7124C74.3085 52.7188 74.3464 52.7252 74.3829 52.7326C74.8691 52.8263 75.3777 52.9112 75.8981 52.9848C76.0143 53.0013 76.1311 53.0155 76.2485 53.0297C76.314 53.0377 76.3797 53.0456 76.4456 53.054C76.8903 53.1054 77.3468 53.1511 77.8105 53.1868C77.8784 53.1916 77.9461 53.197 78.014 53.2023C78.1361 53.212 78.2587 53.2217 78.3831 53.2281C79.0332 53.2683 79.694 53.294 80.3819 53.294C89.6762 53.294 95.6104 49.5908 95.6104 47.0405C95.6104 46.5629 95.4006 46.045 95.0008 45.5171C94.8586 45.3263 94.6821 45.1388 94.4921 44.9479C94.4452 44.9019 94.3975 44.8579 94.349 44.8131L94.3355 44.8006C94.1383 44.6186 93.9258 44.4345 93.6827 44.2537C93.6728 44.2481 93.6665 44.2414 93.6602 44.2358C93.409 44.0517 93.129 43.8675 92.831 43.6867C92.759 43.6432 92.6842 43.5997 92.6086 43.5561C92.3052 43.3776 91.9865 43.2024 91.6425 43.0361C91.6362 43.0327 91.6299 43.0305 91.6263 43.0282C91.2662 42.8564 90.8817 42.6912 90.482 42.5327C90.4376 42.516 90.3927 42.4983 90.348 42.4806C90.3092 42.4653 90.2706 42.4501 90.2326 42.4356C89.4052 42.122 88.4949 41.8385 87.5045 41.5985C87.4199 41.5773 87.3335 41.5573 87.2452 41.5372C85.9955 41.247 84.6261 41.0249 83.146 40.9021C82.2627 40.8273 81.338 40.7872 80.3782 40.7872C79.4643 40.7872 78.5892 40.8296 77.7447 40.8965H77.7402C77.2981 40.9322 76.8677 40.9758 76.4455 41.0271C76.4348 41.0279 76.4236 41.0294 76.4112 41.031C76.4069 41.0315 76.4024 41.0321 76.3977 41.0327C75.9764 41.084 75.5667 41.1421 75.167 41.209C75.1571 41.209 75.1481 41.2113 75.1382 41.2135C72.3481 41.6811 70.0549 42.4903 68.3721 43.4289C68.3481 43.4425 68.3239 43.4556 68.2998 43.4686C68.2625 43.4887 68.2254 43.5088 68.1894 43.5305C68.0272 43.6214 67.8773 43.7164 67.7273 43.8116L67.7077 43.824C67.6683 43.8505 67.6285 43.8761 67.5887 43.9016C67.5449 43.9296 67.5012 43.9577 67.4583 43.9869C67.3268 44.0762 67.2026 44.1677 67.0837 44.257C66.9928 44.3262 66.9064 44.3943 66.8217 44.4612C66.7191 44.545 66.6219 44.6253 66.5291 44.709C66.4409 44.7883 66.3581 44.8675 66.2779 44.9467C66.2014 45.0204 66.1267 45.0929 66.0592 45.1688C65.9754 45.2581 65.9016 45.3474 65.8332 45.4367L65.8172 45.4562C65.7682 45.5157 65.7187 45.576 65.6765 45.6354C65.6045 45.7369 65.5469 45.8374 65.4892 45.9389C65.4773 45.9598 65.4645 45.9806 65.4516 46.0014C65.4314 46.0342 65.4112 46.0669 65.3947 46.0996Z"
        fill="url(#paint0_linear_324_2635)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M159.902 41.7289C159.915 41.7674 159.928 41.8062 159.938 41.8462L159.937 41.8476C159.974 42.0161 160 42.1903 160 42.3711V121.611C160 122.413 159.599 123.131 158.987 123.409L80.9179 159.875C80.9104 159.88 80.9002 159.88 80.8904 159.883C80.8862 159.884 80.8821 159.885 80.8783 159.887C80.7135 159.959 80.5434 160 80.3723 160C80.1976 160 80.0266 159.952 79.86 159.883C79.8503 159.878 79.8398 159.877 79.8301 159.875C79.8254 159.874 79.8209 159.873 79.8168 159.871L0.998482 122.47C0.397964 122.187 0 121.468 0 120.671V41.4267C0 41.4235 0.000416138 41.4205 0.000848304 41.4175C0.0013151 41.4141 0.00180059 41.4107 0.00180059 41.4066C0.00360072 41.2325 0.0270093 41.064 0.0657247 40.9011C0.0781211 40.8462 0.0966174 40.7934 0.114356 40.7429L0.115243 40.7403C0.150358 40.6276 0.189972 40.5216 0.241293 40.4189C0.268302 40.3653 0.297113 40.3129 0.329527 40.2638C0.38715 40.17 0.454676 40.0852 0.526704 40.006C0.537386 39.9937 0.547513 39.9816 0.557486 39.9696C0.581134 39.9412 0.603912 39.9139 0.631144 39.8888C0.637076 39.8828 0.642398 39.8763 0.647738 39.8697C0.655365 39.8603 0.663028 39.8509 0.67256 39.843C0.777894 39.7537 0.891337 39.6801 1.01018 39.6265L22.6276 29.5316V28.3396C22.6276 27.5204 22.7743 26.747 23.0498 26.0216C24.9793 20.9467 33.1879 18.2335 40.9633 18.2335H40.9651C41.7799 18.2335 42.5974 18.2637 43.4131 18.3228H43.4149C44.2325 18.382 45.0437 18.4713 45.8468 18.5885C45.9266 18.6007 46.0052 18.6152 46.0837 18.6297C46.1488 18.6417 46.2137 18.6537 46.279 18.6643C46.2434 18.6582 46.208 18.6514 46.1724 18.6446C46.1172 18.634 46.0617 18.6234 46.0053 18.6152L61.6643 11.3004V10.1084C61.6643 9.28808 61.8128 8.51465 62.0884 7.7903C64.0178 2.71318 72.2246 0 80.0018 0H80.0036C80.8175 0 81.6368 0.0301343 82.4516 0.090403H82.4534C83.271 0.149555 84.0786 0.23884 84.8853 0.356029C86.8751 0.647344 88.8001 1.11943 90.5441 1.76229C90.8259 1.86719 91.1041 1.97657 91.376 2.08929C91.4323 2.11218 91.4843 2.134 91.5386 2.15684L91.5426 2.15849C91.7893 2.26339 92.0306 2.37388 92.2673 2.48549C92.3048 2.5046 92.3435 2.52292 92.3825 2.54135C92.4232 2.56058 92.4641 2.57993 92.5041 2.60044C92.7166 2.70535 92.9264 2.81361 93.1326 2.92521C93.2298 2.97656 93.3297 3.03236 93.427 3.08816C93.6079 3.19085 93.7871 3.29576 93.9618 3.40513C94.0734 3.47544 94.1869 3.54911 94.2958 3.62277C94.448 3.72209 94.5983 3.82366 94.7424 3.92857C94.855 4.01015 94.9627 4.09432 95.0698 4.17804L95.1133 4.21205C95.1411 4.23406 95.169 4.25601 95.1969 4.27795C95.2891 4.3506 95.3814 4.4232 95.4699 4.49777C95.613 4.61942 95.7481 4.74554 95.8823 4.87277C95.9173 4.90614 95.9536 4.9389 95.9901 4.97183C96.039 5.01599 96.0883 5.06047 96.1353 5.10714C96.3451 5.32031 96.5449 5.53684 96.7259 5.76117C96.9825 6.07591 97.2112 6.39957 97.4111 6.73886C97.8108 7.4152 98.089 8.13955 98.2331 8.91298C98.3051 9.30027 98.342 9.69869 98.342 10.1094L98.3411 11.7802L113.881 19.1542C115.688 18.8529 117.563 18.6944 119.409 18.6944H119.413C120.23 18.6944 121.043 18.7245 121.863 18.7837C122.679 18.8428 123.492 18.9321 124.295 19.0493C126.288 19.3406 128.209 19.8127 129.953 20.4555C130.235 20.5604 130.513 20.672 130.785 20.7848L130.811 20.7951C130.859 20.8149 130.907 20.834 130.952 20.854C131.199 20.9589 131.44 21.0694 131.677 21.181C131.714 21.2001 131.753 21.2184 131.792 21.2368C131.833 21.256 131.873 21.2754 131.913 21.2959C132.13 21.4008 132.336 21.5091 132.542 21.6207C132.639 21.6732 132.739 21.729 132.836 21.7848C133.017 21.8874 133.2 21.9924 133.371 22.1017C133.486 22.172 133.596 22.2457 133.705 22.3194C133.857 22.4198 134.008 22.5214 134.152 22.6263C134.256 22.6999 134.352 22.7757 134.448 22.8514C134.473 22.8709 134.498 22.8903 134.523 22.9098C134.55 22.9317 134.578 22.9535 134.606 22.9753C134.698 23.0481 134.791 23.1208 134.879 23.1955C135.022 23.3171 135.157 23.4432 135.292 23.5705C135.319 23.5957 135.347 23.6205 135.375 23.6454C135.433 23.6975 135.492 23.7497 135.545 23.8049C135.754 24.018 135.954 24.2346 136.135 24.4589C136.392 24.7736 136.623 25.0995 136.82 25.4366C137.22 26.114 137.502 26.8384 137.646 27.6118C137.714 27.9991 137.751 28.3975 137.751 28.8082V30.4857L158.994 40.5671C158.996 40.5682 158.996 40.5688 158.997 40.5691C158.998 40.5694 158.999 40.5694 159.001 40.5694L159.004 40.5716C159.005 40.5716 159.006 40.5726 159.007 40.5736C159.008 40.5748 159.009 40.5761 159.01 40.5761C159.122 40.6296 159.233 40.6977 159.332 40.7848C159.346 40.7993 159.359 40.8194 159.375 40.8328C159.412 40.8685 159.444 40.9087 159.478 40.95C159.55 41.0314 159.619 41.1163 159.675 41.21C159.707 41.2614 159.734 41.3105 159.763 41.3663C159.813 41.4678 159.855 41.5772 159.888 41.6899C159.893 41.7029 159.897 41.7159 159.902 41.7289ZM115.433 22.8026C115.013 22.854 114.604 22.9131 114.204 22.979C114.197 22.979 114.191 22.9801 114.185 22.9812C114.182 22.9817 114.179 22.9821 114.177 22.9825C111.385 23.4479 109.093 24.257 107.411 25.1957C107.376 25.2149 107.342 25.2339 107.308 25.2526C107.28 25.2676 107.254 25.2824 107.227 25.2972C107.054 25.3943 106.9 25.4937 106.746 25.593C106.663 25.6488 106.578 25.7024 106.496 25.7559C106.365 25.8452 106.241 25.9367 106.122 26.026C106.031 26.0952 105.942 26.1633 105.86 26.2303C105.755 26.314 105.66 26.3943 105.565 26.478C105.479 26.5573 105.398 26.6365 105.316 26.7158C105.241 26.7894 105.166 26.8642 105.097 26.9379C105.015 27.0271 104.94 27.1164 104.871 27.2057C104.817 27.2727 104.761 27.3385 104.714 27.4055C104.642 27.5071 104.583 27.6075 104.527 27.7091C104.518 27.724 104.509 27.7388 104.499 27.7537C104.475 27.7924 104.451 27.8311 104.433 27.8698C104.358 28.0227 104.295 28.1756 104.255 28.324C104.212 28.4903 104.187 28.6532 104.187 28.814C104.187 28.9557 104.213 29.0974 104.246 29.2448C104.257 29.2927 104.271 29.3396 104.289 29.3876C104.32 29.4881 104.364 29.5918 104.411 29.6945C104.42 29.7123 104.428 29.7304 104.436 29.7488C104.452 29.7847 104.468 29.8217 104.489 29.8586C104.558 29.9858 104.642 30.1142 104.732 30.2414C104.799 30.3363 104.881 30.4334 104.966 30.5304C104.996 30.5706 105.031 30.6097 105.065 30.6499C105.983 31.6711 107.605 32.6968 109.809 33.5059C109.857 33.5235 109.908 33.5415 109.958 33.5599C109.988 33.5708 110.019 33.5818 110.049 33.593C110.462 33.738 110.894 33.8764 111.344 34.0059C111.365 34.0121 111.386 34.0184 111.406 34.0246C111.461 34.041 111.515 34.0572 111.57 34.0718C112.095 34.2168 112.642 34.3496 113.216 34.4668C113.248 34.4735 113.281 34.479 113.314 34.4845C113.348 34.4901 113.382 34.4958 113.414 34.5026C113.903 34.5974 114.41 34.6822 114.932 34.7559C115.068 34.7756 115.208 34.7926 115.348 34.8095C115.391 34.8147 115.433 34.8199 115.475 34.8251C115.92 34.8764 116.377 34.9222 116.842 34.9579C116.91 34.9627 116.978 34.9681 117.046 34.9734C117.168 34.9831 117.29 34.9928 117.417 34.9992C118.063 35.0394 118.726 35.0651 119.414 35.0651C128.711 35.0651 134.642 31.3618 134.642 28.8116C134.642 28.3317 134.432 27.8139 134.035 27.286C133.891 27.0951 133.713 26.9076 133.523 26.7168C133.472 26.6665 133.422 26.6185 133.369 26.5694C133.168 26.3875 132.956 26.2033 132.713 26.0225C132.706 26.017 132.7 26.0103 132.694 26.0047C132.44 25.8183 132.16 25.6364 131.862 25.4556L131.826 25.4338C131.766 25.3975 131.706 25.3612 131.643 25.325C131.338 25.1475 131.019 24.9712 130.675 24.8049C130.672 24.8033 130.67 24.8019 130.667 24.8007C130.665 24.7994 130.662 24.7982 130.659 24.7971C130.301 24.6263 129.914 24.4623 129.515 24.3015C129.477 24.2873 129.439 24.2724 129.401 24.2573C129.356 24.2394 129.311 24.2215 129.265 24.2045C128.438 23.8908 127.527 23.6073 126.537 23.3674C126.452 23.3462 126.37 23.3261 126.281 23.306C125.028 23.0158 123.664 22.7937 122.182 22.6709C121.299 22.5962 120.374 22.556 119.414 22.556C118.502 22.556 117.627 22.6006 116.781 22.6676H116.777C116.335 22.7022 115.905 22.7457 115.482 22.7971C115.471 22.7978 115.461 22.7992 115.449 22.8007C115.444 22.8013 115.439 22.802 115.433 22.8026ZM134.64 41.199V34.6007C131.131 37.4254 125.164 38.9156 119.415 38.9179V47.4525C128.709 47.4525 134.64 43.7481 134.64 41.199ZM65.0206 9.1653C64.9459 9.31819 64.8828 9.47109 64.8432 9.61953C64.7982 9.78582 64.7748 9.95006 64.7739 10.1097C64.7739 10.2492 64.8018 10.3931 64.8351 10.5405C64.8453 10.5855 64.8602 10.6296 64.8754 10.6745L64.8783 10.6833C64.9099 10.7838 64.9531 10.8875 64.9999 10.9902C65.0085 11.0082 65.0168 11.0265 65.0253 11.0451C65.0415 11.0809 65.0581 11.1176 65.0782 11.1543C65.1475 11.2815 65.2304 11.4099 65.3231 11.5371C65.3869 11.6256 65.4633 11.716 65.5397 11.8065L65.5563 11.8261C65.5887 11.8663 65.622 11.9054 65.6571 11.9456C66.5754 12.9668 68.1942 13.9925 70.3974 14.8016C70.4317 14.814 70.4662 14.8263 70.5009 14.8386C70.5471 14.8549 70.5937 14.8714 70.6405 14.8887C71.0502 15.036 71.4841 15.1721 71.9352 15.3016C71.9613 15.3093 71.9869 15.3172 72.0123 15.3249C72.0605 15.3397 72.1081 15.3543 72.1576 15.3675C72.6843 15.5125 73.2299 15.6453 73.8043 15.7625C73.8428 15.7704 73.8823 15.7771 73.9215 15.7838C73.9493 15.7885 73.977 15.7932 74.0042 15.7983C74.4922 15.8931 74.9991 15.9779 75.5195 16.0516C75.6356 16.0681 75.7525 16.0822 75.8698 16.0965C75.9354 16.1044 76.0011 16.1124 76.0669 16.1208C76.5117 16.1721 76.9682 16.2179 77.4318 16.2536C77.4997 16.2584 77.5674 16.2637 77.6352 16.2691C77.7574 16.2788 77.88 16.2884 78.0045 16.2949C78.6545 16.3351 79.3154 16.3608 80.0032 16.3608C89.3003 16.3608 95.2317 12.6575 95.2317 10.1073C95.2317 9.62965 95.0219 9.1118 94.6222 8.58388C94.4817 8.39302 94.3035 8.20553 94.1135 8.01468C94.0666 7.96877 94.0189 7.92474 93.9705 7.88L93.9568 7.86736C93.7597 7.68542 93.5472 7.50127 93.3041 7.32047C93.2942 7.31489 93.2879 7.30819 93.2816 7.30261C93.0304 7.11844 92.7504 6.9343 92.4523 6.7535L92.4163 6.73166C92.3564 6.69542 92.2965 6.65917 92.2336 6.62292C91.9283 6.44435 91.6096 6.26913 91.2657 6.10283C91.2594 6.1006 91.2531 6.09725 91.2495 6.09502C90.8893 5.92313 90.5049 5.75796 90.1051 5.59948C90.0607 5.58272 90.0158 5.56501 89.9711 5.54736C89.9323 5.53209 89.8938 5.51688 89.8557 5.50238C89.0283 5.18875 88.1181 4.90304 87.1277 4.66532C87.043 4.64411 86.9566 4.62403 86.8684 4.60394C85.6187 4.31374 84.2493 4.09165 82.7691 3.96888C81.8858 3.89633 80.9612 3.85616 80.0014 3.85616C79.0893 3.85616 78.2142 3.89745 77.3706 3.96442H77.3661C76.924 4.00013 76.4936 4.04366 76.0714 4.095C76.0607 4.09582 76.0495 4.09726 76.0371 4.09886C76.0328 4.09942 76.0283 4.1 76.0236 4.10058C75.6023 4.15192 75.1926 4.20995 74.7929 4.27692C74.7837 4.27692 74.7754 4.27882 74.7663 4.28086L74.7641 4.28138C71.9721 4.74901 69.6799 5.55815 67.998 6.49678C67.9756 6.50927 67.9532 6.52132 67.9309 6.5333C67.8914 6.55452 67.8523 6.57552 67.8144 6.59835C67.6522 6.68924 67.5024 6.78424 67.3523 6.87942L67.3327 6.89186C67.278 6.92873 67.2225 6.96463 67.1675 7.00019C67.1392 7.01845 67.1111 7.03663 67.0833 7.05481C66.9519 7.1441 66.8285 7.23561 66.7088 7.3249C66.6178 7.39186 66.5314 7.45994 66.4468 7.52691C66.3441 7.61061 66.2469 7.69097 66.1542 7.77468C66.0659 7.85389 65.984 7.9331 65.9021 8.01231C65.8901 8.02417 65.878 8.03608 65.8659 8.0479C65.8031 8.1095 65.7407 8.17082 65.6833 8.2345C65.6013 8.32378 65.5275 8.41307 65.4573 8.50235C65.4442 8.51883 65.4309 8.53538 65.4176 8.55197C65.3777 8.60165 65.3375 8.65164 65.3024 8.70101C65.2304 8.80258 65.1728 8.90302 65.1151 9.00459C65.1032 9.02542 65.0904 9.04626 65.0775 9.06709C65.0573 9.09983 65.0371 9.13256 65.0206 9.1653ZM95.2333 22.499V15.9007C91.7229 18.7245 85.7546 20.2144 80.0067 20.2156V28.7501C89.3019 28.7501 95.2333 25.0481 95.2333 22.499ZM25.9848 27.3974C25.9101 27.5503 25.8471 27.7032 25.8075 27.8517C25.7625 28.0179 25.7381 28.1833 25.7399 28.3407C25.7399 28.4824 25.7678 28.6241 25.8011 28.7715C25.8113 28.8165 25.8262 28.8606 25.8414 28.9055L25.8444 28.9143C25.8759 29.0148 25.9191 29.1186 25.9659 29.2212C25.9734 29.2376 25.9806 29.254 25.9877 29.2705C26.0045 29.3092 26.0215 29.3484 26.0442 29.3875C26.1136 29.5125 26.1964 29.6409 26.2891 29.7681C26.3576 29.8652 26.4395 29.9623 26.5223 30.0594C26.5547 30.0996 26.588 30.1386 26.6232 30.1788C27.5414 31.2 29.1621 32.2257 31.3652 33.0348C31.4061 33.05 31.4476 33.0648 31.4896 33.0798C31.5283 33.0935 31.5673 33.1075 31.6065 33.1219C32.018 33.2692 32.4502 33.4054 32.9013 33.5348C32.9273 33.5425 32.9527 33.5503 32.9779 33.5581C33.026 33.5729 33.0735 33.5875 33.1236 33.6007C33.6503 33.748 34.196 33.8786 34.7704 33.9958C34.8089 34.0036 34.8483 34.0103 34.8876 34.017C34.9154 34.0217 34.943 34.0264 34.9703 34.0315C35.46 34.1264 35.9669 34.2112 36.4873 34.2848C36.6313 34.3055 36.7781 34.3232 36.9251 34.341C36.9611 34.3453 36.997 34.3496 37.033 34.354C37.4759 34.4076 37.9324 34.4534 38.3979 34.4891C38.4655 34.4939 38.5329 34.4992 38.6003 34.5045C38.7223 34.5142 38.8447 34.5239 38.9705 34.5304C39.6206 34.5706 40.2814 34.5962 40.9693 34.5962C50.2654 34.5962 56.1978 30.893 56.1978 28.3428C56.1978 27.864 55.988 27.345 55.59 26.8171C55.446 26.6285 55.2677 26.441 55.0777 26.2501C55.0282 26.1999 54.9769 26.1519 54.9238 26.1028C54.7248 25.9187 54.5105 25.7367 54.2692 25.5559C54.2634 25.552 54.2586 25.5474 54.2539 25.5431C54.2521 25.5414 54.2503 25.5397 54.2485 25.5381C53.9973 25.3539 53.7155 25.1698 53.4193 24.989C53.3823 24.9672 53.3455 24.9454 53.3088 24.9236C53.2721 24.9018 53.2355 24.8801 53.1987 24.8584C52.8944 24.6809 52.5766 24.5046 52.2308 24.3383C52.2269 24.3369 52.224 24.3351 52.2213 24.3333C52.2197 24.3323 52.2181 24.3313 52.2164 24.3305C51.8581 24.1586 51.4718 23.9934 51.0721 23.8349C51.0253 23.8177 50.9788 23.7994 50.9325 23.7812C50.8951 23.7665 50.8579 23.7518 50.8209 23.7379C49.9953 23.4242 49.085 23.1385 48.0947 22.9008C48.0567 22.892 48.0191 22.8829 47.9814 22.8739C47.9332 22.8623 47.8848 22.8507 47.8354 22.8394C46.5856 22.5492 45.2181 22.3271 43.7361 22.2044C42.8519 22.1296 41.9282 22.0894 40.9684 22.0894C40.0545 22.0894 39.1811 22.134 38.3348 22.201H38.3303C37.89 22.2356 37.4596 22.2791 37.0374 22.3305C37.0212 22.3316 37.0059 22.3338 36.9879 22.336C36.5665 22.3852 36.1569 22.4454 35.7571 22.5124C35.748 22.5124 35.7396 22.5143 35.7306 22.5163L35.7283 22.5168C32.9382 22.9845 30.645 23.7925 28.9623 24.7323C28.9382 24.7458 28.914 24.7589 28.8899 24.772C28.8526 24.7921 28.8156 24.8121 28.7795 24.8338C28.6102 24.9287 28.4527 25.028 28.2978 25.1273C28.254 25.1568 28.2092 25.1857 28.1649 25.2143C28.1254 25.2398 28.0862 25.265 28.0484 25.2903C27.9152 25.3796 27.7918 25.4688 27.6721 25.5604C27.5829 25.6273 27.4929 25.6954 27.4101 25.7624C27.3074 25.8461 27.2102 25.9264 27.1175 26.0101C27.0293 26.0894 26.9464 26.1664 26.8663 26.2479C26.7898 26.3215 26.715 26.3941 26.6475 26.47C26.5638 26.5593 26.4917 26.6485 26.4215 26.7356C26.4055 26.7562 26.3891 26.7768 26.3727 26.7973C26.3358 26.8436 26.2991 26.8898 26.2666 26.9354C26.1946 27.0369 26.137 27.1374 26.0794 27.2389C26.0664 27.2617 26.0522 27.2845 26.0382 27.3071C26.0192 27.3377 26.0004 27.3679 25.9848 27.3974ZM56.1975 40.7311V34.1328C52.6853 36.9588 46.7196 38.4488 40.9709 38.4477V46.9823C50.2661 46.9823 56.1975 43.2802 56.1975 40.7311ZM22.629 40.731V33.6484L5.93416 41.4471L80.3778 76.7743L154.066 42.3502L137.748 34.6068V41.1939C137.748 47.7588 128.302 51.3011 119.408 51.3011C110.52 51.3011 101.074 47.7588 101.074 41.1939V28.8068C101.074 27.9865 101.222 27.213 101.5 26.4887C102.471 23.9273 105.044 21.972 108.346 20.6572L98.3395 15.9095V22.4955C98.3395 29.0581 88.8894 32.6027 80.0004 32.6027C71.112 32.6027 61.6647 29.0604 61.6647 22.4955V15.4152L51.7013 20.0681C51.9156 20.1518 52.1299 20.2355 52.3378 20.3203C52.373 20.3368 52.4085 20.3509 52.4441 20.3651C52.4642 20.3731 52.4843 20.3811 52.5044 20.3895C52.7511 20.4944 52.9906 20.6049 53.2292 20.7165C53.2542 20.7287 53.2795 20.7407 53.3048 20.7528C53.3586 20.7784 53.4127 20.8042 53.466 20.8315C53.6811 20.9364 53.8891 21.0447 54.0935 21.1563C54.1925 21.2087 54.2916 21.2645 54.3879 21.3203C54.5689 21.423 54.7499 21.5279 54.9227 21.6373C55.0362 21.7087 55.1478 21.7802 55.2567 21.8538C55.4089 21.9543 55.5611 22.0558 55.7051 22.1607C55.8066 22.2342 55.9029 22.3098 55.9991 22.3853C56.0242 22.405 56.0492 22.4246 56.0743 22.4442L56.1058 22.4685C56.2168 22.554 56.3273 22.6392 56.4326 22.7299C56.5767 22.8505 56.7099 22.9755 56.8441 23.1027C56.8757 23.1326 56.9083 23.1619 56.9409 23.1911C56.9947 23.2394 57.0483 23.2875 57.0971 23.3382C57.3087 23.5502 57.5068 23.7668 57.6895 23.9911C57.9461 24.307 58.1748 24.6317 58.3747 24.971C58.7727 25.6474 59.0527 26.3717 59.1967 27.1451C59.2669 27.5324 59.3039 27.9309 59.3039 28.3416V40.731C59.3039 47.2936 49.8556 50.8382 40.9647 50.8382C32.0763 50.8382 22.629 47.2959 22.629 40.731ZM81.9294 155.289L156.889 120.277V45.1542L81.9294 80.1628V155.289Z"
        fill="url(#paint1_linear_324_2635)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M571.672 112.76C580.762 112.76 588.5 109.61 594.891 103.31C601.281 96.92 604.43 89.18 604.43 80C604.43 70.82 601.281 63.08 594.891 56.78C588.5 50.39 580.762 47.24 571.672 47.24C562.578 47.24 554.84 50.39 548.449 56.78C542.148 63.08 539 70.82 539 80C539 89.18 542.148 96.92 548.449 103.31C554.84 109.61 562.578 112.76 571.672 112.76ZM571.672 100.61C565.91 100.61 561.051 98.72 557.18 94.85C553.309 90.98 551.328 86.03 551.328 80C551.328 73.97 553.309 69.02 557.18 65.15C561.051 61.28 565.91 59.3 571.672 59.3C577.43 59.3 582.289 61.28 586.16 65.15C590.031 69.02 592.012 73.97 592.012 80C592.012 86.03 590.031 90.98 586.16 94.85C582.289 98.72 577.43 100.61 571.672 100.61Z"
      />
      <path d="M254.02 88.48L267.969 112.24H254.559L241.871 90.37H232.422V112.24H220V79.49H234.949V79.48H245.199C249.879 79.48 253.75 75.25 253.75 70.12C253.75 64.99 249.879 60.85 245.199 60.85L220 60.85V49.24H245.199C251.051 49.24 256 51.31 260.051 55.36C264.102 59.41 266.172 64.36 266.172 70.12C266.172 77.95 261.309 85.15 254.02 88.48Z" />
      <path d="M298.391 86.23V86.24H285.969V74.53L322.238 74.53V86.23H298.391Z" />
      <path d="M285.969 61.12V49.24H324.488V61.12H285.969Z" />
      <path d="M299.039 100.36V100.39H285.969V112.24H324.938V100.36H299.039Z" />
      <path d="M402.516 112.24H389.016L386.523 104.752L372.863 63.24H372.371L356.25 112.24H342.938L364.988 49.24H380.379L402.516 112.24Z" />
      <path d="M459.07 79.57C464.559 82.72 467.352 87.58 467.352 93.97C467.352 99.28 465.461 103.69 461.68 107.11C457.898 110.53 453.219 112.24 447.73 112.24H421V100.63L447.73 100.63C451.961 100.63 455.02 97.48 455.02 93.16C455.02 88.93 451.961 85.78 447.73 85.78L421 85.78V74.71L445.84 74.71C449.711 74.71 452.59 71.74 452.59 67.78C452.59 63.82 449.801 60.85 445.84 60.85H436.148V60.84H421V49.24H445.84C451.238 49.24 455.738 50.95 459.43 54.28C463.121 57.61 465.012 61.84 465.012 66.97C465.012 72.19 463.031 76.42 459.07 79.57Z" />
      <path d="M497.422 49.24V100.36H521.449V112.24H485V49.24H497.422Z" />
      <path d="M726.02 77.84L750.227 110.24H735.918L713.418 80.72V110.24H701V47.24H713.418V75.05L735.02 47.24H749.328L726.02 77.84Z" />
      <path d="M623 81.6059V78.3932C623.336 69.8224 626.395 62.5379 632.238 56.69C638.449 50.39 646.281 47.24 655.73 47.24C667.16 47.24 677.422 53 682.82 62.09L672.109 68.3C668.961 62.63 662.93 59.3 655.73 59.3C649.609 59.3 644.66 61.19 640.879 65.06C637.191 68.93 635.301 73.88 635.301 80C635.301 86.03 637.191 90.98 640.879 94.85C644.66 98.72 649.609 100.61 655.73 100.61C662.93 100.61 669.141 97.19 672.109 91.7L682.82 97.91C677.422 107 667.25 112.76 655.73 112.76C646.281 112.76 638.449 109.61 632.238 103.31C626.395 97.3773 623.336 90.1677 623 81.6059Z" />
      <path d="M791.359 112.5C779.289 112.5 770.738 106.971 767 97.9331V96.7019L777.23 90.72C779.66 97.11 784.52 100.35 791.719 100.35C798.648 100.35 801.801 97.56 801.801 93.69C801.801 91.44 800.809 89.73 798.828 88.56C796.852 87.3 793.34 85.95 788.211 84.51C782.539 82.8 779.121 81.45 775.16 78.66C771.289 75.78 769.219 71.46 769.219 65.7C769.219 60.03 771.199 55.44 775.25 52.11C778.387 49.4599 782.066 47.8366 786.203 47.24H793.766C802.105 48.3959 808.66 53.3554 812.422 61.11L801.98 67.14C799.461 61.74 795.41 59.04 789.922 59.04C784.789 59.04 781.641 61.65 781.641 65.34C781.641 67.32 782.449 68.94 784.07 70.2C785.781 71.37 788.93 72.72 793.609 74.16L797.93 75.6C798.922 75.87 800.27 76.41 801.98 77.13C803.691 77.76 805.039 78.39 805.941 79.02C807.828 80.19 810.711 82.44 811.879 84.6C813.23 86.76 814.219 89.91 814.219 93.51C814.219 99.36 812.059 103.95 807.828 107.37C803.602 110.79 798.109 112.5 791.359 112.5Z" />
      <defs>
        <linearGradient
          id="paint0_linear_324_2635"
          x1="24.8723"
          y1="140.089"
          x2="148.129"
          y2="-20.2369"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#105EFF" />
          <stop offset="0.413357" stop-color="#009BFF" />
          <stop offset="0.735652" stop-color="#105EFF" />
          <stop offset="1" stop-color="#090E43" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_324_2635"
          x1="24.8723"
          y1="140.089"
          x2="148.129"
          y2="-20.2369"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#105EFF" />
          <stop offset="0.413357" stop-color="#009BFF" />
          <stop offset="0.735652" stop-color="#105EFF" />
          <stop offset="1" stop-color="#090E43" />
        </linearGradient>
      </defs>
    </svg>
  ),
  components: {
    // Handle storybook overrides
    code: (props: any) => (
      <Code {...props} className={`${props.className} rb-code`} />
    ),
    // Handle storybook overrides
    pre: (props: any) => (
      <Pre {...props} className={`${props.className} prismjs`} />
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 3
  },
  footer: {
    component: (
      <footer className="block self-center pb-5 pt-5 text-center" style={{ borderTop: 'solid 1px hsla(203, 50%, 30%, 0.15)' }}>
        <span>
          Made with ❤️ by{" "}
          <Link className="text-secondary underline" href="https://goodcode.us?utm_source=reablocks">
            Good Code
          </Link>
        </span>
      </footer>
    ),
  },
  feedback: {
    content: null,
  },
  project: {
    link: "https://github.com/reaviz/reablocks",
  },
  docsRepositoryBase: "https://github.com/reaviz/reablocks/tree/master/docs",
  useNextSeoProps: () => {
    const { asPath } = useRouter();

    if (asPath !== "/") {
      return {
        titleTemplate: "%s \u2013 Reablocks",
        description:
          "Beautifully designed, highly customizable, Open Source React components based on Tailwind and Framer Motion.",
      };
    } else {
      return {
        titleTemplate: "Reablocks \u2013 Open Source ReactJS Component Library",
        description:
          "Beautifully designed, highly customizable, Open Source React components based on Tailwind and Framer Motion.",
      };
    }
  },
};

export default config;
