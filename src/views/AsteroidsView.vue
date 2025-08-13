<script setup>
import { ref, onMounted } from 'vue'
// components
import TitleWithImage from '@/components/TitleWithImage.vue'
// services
import DataService from '@/services/nasa.js'

const fromDate = ref(null)
const toDate = ref(null)

const asteroid_neows = ref(null)

onMounted(() => {
  // get today date
  const todayDateTime = new Date().toISOString()
  const todayDate = todayDateTime.split('T')[0]

  const lastWeekDateTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const lastWeekDate = lastWeekDateTime.split('T')[0]

  fromDate.value = lastWeekDate
  toDate.value = todayDate

  // send request to nasa
  DataService.getAsteroidsNeows(fromDate.value, toDate.value).then((data) => {
    asteroid_neows.value = data.data
  })
})
</script>

<template>
  <div class="d-flex flex-column justify-content-center gap-4 h-100">
    <TitleWithImage :title="'Asteroids'" :pictureUrl="'src/assets/asteroid_cover.png'" />
    <div
      v-if="asteroid_neows == null"
      class="d-flex justify-content-center align-items-center w-100 h-100"
    >
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else class="container d-flex justify-content-center align-items-center w-100 h-100 p-4">
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          v-if="asteroid_neows"
          v-for="(value, key) in asteroid_neows.near_earth_objects"
          :key="key"
        >
          <v-expansion-panel-title>{{ key }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Diameter (km)</th>
                  <th class="text-left">Distance from Earth (km)</th>
                  <th class="text-left">Hazardous</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="asteroid_neows" v-for="item in value">
                  <td>{{ item.name }}</td>
                  <td>
                    {{
                      parseFloat(item.estimated_diameter.kilometers.estimated_diameter_min).toFixed(
                        2,
                      )
                    }}
                    -
                    {{
                      parseFloat(item.estimated_diameter.kilometers.estimated_diameter_max).toFixed(
                        2,
                      )
                    }}
                  </td>
                  <td>
                    {{
                      parseFloat(item.close_approach_data[0].miss_distance.kilometers).toFixed(2)
                    }}
                  </td>
                  <td>{{ item.is_potentially_hazardous_asteroid ? 'yes' : 'no' }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
