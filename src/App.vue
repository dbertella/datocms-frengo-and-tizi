<template>
  <div v-if="data">
    <div
      v-bind:class="[
        'bg-cover fixed top-0 right-0 bottom-0 left-0 font-sans antialiased leading-normal',
        nightMode ? 'text-gray-100' : 'text-gray-900',
        nightMode ? 'text-gray-100' : 'text-gray-900',
      ]"
      v-bind:style="{
        backgroundImage: `url('${data.theme.backgroundImage.responsiveImage.base64}')`,
      }"
    >
      <div
        class="bg-cover fixed top-0 right-0 bottom-0 left-0 overflow-auto"
        v-bind:style="{
          backgroundImage: `url('${data.theme.backgroundImage.url}')`,
        }"
      >
        <div
          class="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32"
        >
          <!--Main Col-->
          <div
            id="profile"
            v-bind:class="[
              'w-full lg:w-3/5 rounded-lg shadow-2xl opacity-75 mx-auto ',
              nightMode ? 'bg-gray-900' : 'bg-white',
            ]"
          >
            <div class="p-4 md:p-12 text-center">
              <h1 class="text-5xl font-bold pt-8 lg:pt-0 great-vibes">
                {{ data.profile.name }}
              </h1>
              <div
                v-bind:class="[
                  'mx-auto w-4/5 pt-3 border-b-2 opacity-25',
                  `border-${data.theme.color}-500`,
                ]"
              ></div>
              <p
                class=""
                v-bind:class="[
                  'pt-2 text-xs lg:text-sm flex items-center justify-center',
                  nightMode ? 'text-gray-400' : 'text-gray-900',
                ]"
              >
                <a
                  class="pr-4"
                  href="https://www.google.com/maps/place/Villa+Ex+Magni+Rizzoli/@45.8527137,9.270366,17z/data=!3m1!4b1!4m5!3m4!1s0x47841e4836e82773:0x4e1bed367587a67b!8m2!3d45.85271!4d9.27256"
                  target="_blank"
                  rel="noopener noreferrer"
                  >📌</a
                >

                {{ data.profile.location }} -
                <a
                  class="link mx-1 underline"
                  href="http://www.villaexmagnirizzoli.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >info</a
                >
                -
                <a
                  class="link ml-1 underline"
                  href="https://www.google.com/maps/place/Villa+Ex+Magni+Rizzoli/@45.8527137,9.270366,17z/data=!3m1!4b1!4m5!3m4!1s0x47841e4836e82773:0x4e1bed367587a67b!8m2!3d45.85271!4d9.27256"
                  target="_blank"
                  rel="noopener noreferrer"
                  >map</a
                >
              </p>
              <p class="pt-8 text-3xl great-vibes">
                <strong>{{ data.profile.dateAndHours }}</strong>
              </p>
              <p class="pt-2 text-base">
                {{ data.profile.description }}
              </p>
              <p class="pt-3 text-sm">
                {{ data.profile.graditaConferma }}
              </p>

              <div class="pt-6 flex justify-center pb-8">
                <a
                  v-bind:href="`mailto:${data.profile.email}`"
                  class=""
                  v-bind:class="[
                    'text-white font-bold py-2 px-4 rounded-full',
                    `bg-${data.theme.color}-700`,
                    `hover:bg-${data.theme.color}-900`,
                  ]"
                >
                  Conferma scrivendo una mail a {{ data.profile.email }}
                </a>
              </div>

              <div class="flex items-center flex-wrap">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/explore/tags/francoetiziana/"
                  v-bind:class="[
                    'link text-xl mt-6 w-1/2 mx-auto flex flex-wrap items-center justify-center text-gray-600',
                    `hover:text-${data.theme.color}-700`,
                  ]"
                >
                  <span class="fill-current ml-3 mr-3 lg:ml-0 lg:mr-5">🍿</span>
                  <span>#francoetiziana</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Pin to top right corner -->
          <div class="absolute top-0 right-0 h-12 w-18 p-4">
            <button
              class="js-change-theme focus:outline-none"
              v-on:click="toggleDayNight"
            >
              {{ nightMode ? "☀️" : "🌙" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "./lib/datocms";
import { toHead } from "vue-datocms";

export default {
  name: "App",
  data() {
    return {
      nightMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      data: null,
    };
  },
  methods: {
    toggleDayNight() {
      this.nightMode = !this.nightMode;
    },
  },
  metaInfo() {
    if (!this || !this.data) {
      return;
    }
    return toHead(this.data.profile.seo, this.data.site.favicon);
  },
  async mounted() {
    this.data = await request({
      query: `
        {
          site: _site {
            favicon: faviconMetaTags {
              ...metaTagsFragment
            }
          }
          profile {
            seo: _seoMetaTags {
              ...metaTagsFragment
            }
            name
            dateAndHours
            description
            graditaConferma
            location
            email
            coordinates {
              latitude
              longitude
            }
          }
          theme {
            color
            backgroundImage {
              url(imgixParams: { w: 1440, auto: format })
              responsiveImage(imgixParams: { w: 1440, auto: format }) {
                base64
              }
            }
          }
        }

        fragment metaTagsFragment on Tag {
          attributes
          content
          tag
        }
        # fragment imageFields on ResponsiveImage {
        #   srcSet
        #   sizes
        #   src
        #   width
        #   height
        #   alt
        #   title
        #   base64
        # }
      `,
    });
  },
};
</script>
