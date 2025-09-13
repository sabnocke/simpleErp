<script lang="ts">
  import Navbar from "$lib/nahore/Navbar.svelte";
  import {ScheduleXCalendar} from "@schedule-x/svelte";
  // import type {CalendarConfig} from "@schedule-x/calendar";
  import {translations} from "@schedule-x/translations"
  // import {Calendar, TimeGrid, DayGrid} from '@event-calendar/core';
  import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
    // createViewList,
    createCalendar
  } from '@schedule-x/calendar'
  // import {createCalendar, createViewDay, createViewWeek} from "@schedule-x/calendar";
  import "@schedule-x/theme-default/dist/index.css";
  import "temporal-polyfill/global"
  import {onMount} from "svelte";
  import {fullMatrix} from "$lib/singletons/inputHandler.svelte.ts";

  let names = ["Orders", "Calendar"];

  let toDisplay = $derived(
      fullMatrix.matrix.filter(item => fullMatrix.selector(item.done, item.show))
  )

  interface Event {
    id: string | number;
    title: string;
    start: Temporal.ZonedDateTime | Temporal.PlainDate;
    end: Temporal.ZonedDateTime | Temporal.PlainDate;
    //TODO maybe add more info
  }

  const events: Event[] = $state([]);
  let container: ReturnType<typeof newCalendar> | null = $state(null);

  interface Container<T>{
    item: T
  }

  function newCalendar() {
    return createCalendar({
      views: [createViewDay(), createViewMonthAgenda(), createViewMonthGrid(), createViewWeek()],
      events: events,  // uses interface Event
      translations: translations,
      locale: "cs-CZ",
      timezone: "Europe/Prague",
      dayBoundaries: {
        start: "07:00",
        end: "15:00",
      },
      weekOptions: {
        gridHeight: 1000,
      },
    })
  }



  onMount(() => {
    container = newCalendar();
  })


  let options = $state({
    view: 'dayGridWeek',
    events: [
      // your list of events
    ]
  });

  // let options = {
  //   view: "dayGridMonth",
  //   events: [
  //       // events go here
  //   ]
  // }
</script>

<div class="display-box">
  <Navbar active={1} names={names} />
  <div class="calendar-box">
    {#if container}
      <ScheduleXCalendar calendarApp={container} />
    {/if}
  </div>
</div>

<style lang="scss">
  .display-box {
    display: flex;
    width: 100vw;
    height: 100vh;
  }

  .calendar-box {
    flex: 5;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.sx-svelte-calendar-wrapper) {
    width: 75vw;
    //max-width: 100vw;
    height: 90vh;
    //max-height: 90vh;
  }
</style>