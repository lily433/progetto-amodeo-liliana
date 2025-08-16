<script setup>
import { ref, onMounted } from 'vue'
// components
import TitleWithImage from '@/components/TitleWithImage.vue'
// services
import DataService from '@/services/nasa.js'

const data = ref(null)
const error = ref(null)
const loading = ref(false)

const startDate = ref(null)
const endDate = ref(null)

onMounted(() => {
  startDate.value = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  endDate.value = new Date()

  onDateChange()
})

function onDateChange() {
  const formattedStartDate = startDate.value.toISOString().split('T')[0]
  const formattedEndDate = endDate.value.toISOString().split('T')[0]

  loading.value = true
  // send request to nasa
  DataService.getAsteroidsNeows(formattedStartDate, formattedEndDate)
    .then((d) => {
      const sorted = Object.fromEntries(
        Object.entries(d.data.near_earth_objects).sort(([a], [b]) => new Date(a) - new Date(b)),
      )
      data.value = sorted
      error.value = null
    })
    .catch((err) => {
      error.value = err.response.data.error_message
      data.value = null
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-center gap-4 h-100">
    <div style="width: 100%; height: 400px">
      <TitleWithImage :title="'Asteroids'" :pictureUrl="'src/assets/asteroid_cover.png'" />
    </div>
    <div
      class="container d-flex flex-column justify-content-center align-items-center w-100 gap-2 m-4"
    >
      <div class="d-flex w-100 justify-content-between align-items-center gap-4">
        <v-date-input
          v-model="startDate"
          label="Start date"
          variant="solo"
          @update:model-value="onDateChange"
        />
        <v-date-input
          v-model="endDate"
          label="End date"
          variant="solo"
          @update:model-value="onDateChange"
        />
      </div>

      <div v-if="loading" class="d-flex justify-content-center align-items-center w-100 h-100">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <div v-else style="min-height: 300px" class="w-100">
        <div v-if="error != null" class="text-danger">
          {{ error }}
        </div>

        <div v-if="data != null" class="d-flex flex-column gap-2 w-100 h-100">
          <div>
            Found <strong>{{ Object.keys(data).length }}</strong> results
          </div>
          <v-expansion-panels variant="accordion">
            <v-expansion-panel v-if="data" v-for="(value, key) in data" :key="key">
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
                    <tr v-if="data" v-for="item in value">
                      <td>{{ item.name }}</td>
                      <td>
                        {{
                          parseFloat(
                            item.estimated_diameter.kilometers.estimated_diameter_min,
                          ).toFixed(2)
                        }}
                        -
                        {{
                          parseFloat(
                            item.estimated_diameter.kilometers.estimated_diameter_max,
                          ).toFixed(2)
                        }}
                      </td>
                      <td>
                        {{
                          parseFloat(item.close_approach_data[0].miss_distance.kilometers).toFixed(
                            2,
                          )
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
    </div>
  </div>
</template>
