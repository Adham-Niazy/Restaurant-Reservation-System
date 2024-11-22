<script>
import DynamicButton from "./DynamicButton.vue";
import { mapState } from "vuex";
export default {
  components: { DynamicButton },
  computed: {
    ...mapState(["form"]),
  },
  methods: {
    addSlot(day) {
      if (this.form.reservation_times[day].length < 3)
        this.form.reservation_times[day].push(["00:00", "00:00"]);
    },
    removeSlot(day, index) {
      this.form.reservation_times[day].splice(index, 1);
    },
    updateSlot(day, index, positions, change) {
      this.form.reservation_times[day][index][positions] = change;
    },
    getClonedVersionFromDay(day) {
      return this.form.reservation_times[day].map((slot) => [...slot]);
    },
    applyOnAllDays(day) {
      for(let weekday in this.form.reservation_times) {
        if ( weekday !== day ) {
          this.form.reservation_times[weekday] = this.getClonedVersionFromDay(day);
        }
      }
    }
  },
};
</script>

<template>
  <div class="flex flex-col gap-7">
    <div v-for="(slots, day) in form.reservation_times" :key="day">
      <div class="flex items-center justify-between">
        <h3 class="mb-1 uppercase">{{ day }}</h3>
        <h3 @click="applyOnAllDays(day)" v-if="day === 'saturday'" class="mb-1 text-violet-600 cursor-pointer">Apply on all days</h3>
      </div>
      <div class="p-2 rounded-xl border-gray-300 bg-white border">
        <div class="flex justify-between items-center">
          <div
            class="flex w-full gap-3 flex-wrap h-full"
            v-if="slots.length > 0"
          >
            <div
              class="relative border flex items-center border-gray-300 text-gray-900 text-sm rounded-xl h-full w-[15rem]"
              v-for="(slot, index) in slots"
              :key="slot[0] + slot[1] + index"
            >
              <input
                type="time"
                id="startTimeSlot"
                class="focus:ring-blue-500 rounded-xl focus:border-blue-500 block w-1/2 p-2.5 cursor-pointer"
                :value="slot[0]"
                @input="updateSlot(day, index, 0, $event?.target?.value)"
                required
              />
              <div class="h-5 w-[1px] bg-gray-300"></div>
              <input
                type="time"
                id="endTimeSlot"
                class="focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 cursor-pointer rounded-xl"
                :value="slot[1]"
                @input="updateSlot(day, index, 1, $event?.target?.value)"
                required
              />
              <span
                class="absolute bg-red-100 text-red-800 text-xs font-medium flex justify-center w-5 h-5 items-center rounded-full top-0 end-0 translate-x-1/2 -translate-y-1/2 cursor-pointer"
                @click="removeSlot(day, index)"
              >
                &times;
              </span>
            </div>
          </div>
          <h3 class="font-light" v-else>Add Available Reservation Times</h3>
          <dynamic-button
            v-if="slots.length < 3"
            btnStyle="secondary"
            @buttonClicked="addSlot(day)"
          >
            +
          </dynamic-button>
        </div>
      </div>
    </div>
  </div>
</template>
