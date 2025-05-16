<template>
  <q-page class="responsive-container bg-primary text-white">
    <div class="q-px-md q-py-lg">
      <h1 class="text-white text-center q-mb-md">
        About JSON Convert
      </h1>
      <p class="text-body1 q-mb-md text-center">
        JSON Convert is a powerful and intuitive online tool that allows you to convert JSON data into various formats like <strong>CSV</strong>, <strong>tables</strong>, <strong>charts</strong>, and soon <strong>XML</strong>. Designed for developers, analysts, and data enthusiasts, this system ensures a smooth experience in viewing and manipulating structured data.
      </p>

      <q-separator dark spaced class="q-my-lg" />

      <!-- Features -->
      <div class="q-mb-xl">
        <h2 class="text-h5 text-white">Key Features</h2>
        <ul class="q-pl-lg">
          <li class="q-mb-sm">Convert JSON to <strong>CSV</strong> format with high accuracy.</li>
          <li class="q-mb-sm">Visualize JSON data as <strong>interactive charts</strong> (bar, pie, etc).</li>
          <li class="q-mb-sm">Export data to <strong>PDF</strong> directly from tables or charts.</li>
          <li class="q-mb-sm">Upcoming: Export JSON to <strong>XML</strong> and <strong>Excel</strong>.</li>
        </ul>
      </div>

      <!-- Release Notes -->
      <div class="q-mb-xl">
        <h2 class="text-h5 text-white">Release Timeline</h2>
        <q-timeline color="green-4" layout="dense">
          <q-timeline-entry title="Project Created" subtitle="24/03" />
          <q-timeline-entry title="Chart Visualization Implemented" subtitle="06/05" />
          <q-timeline-entry title="PDF Download Button Added" subtitle="15/05" />
          <q-timeline-entry title="Upcoming: XML Conversion Support" subtitle="Planned" />
          <q-timeline-entry title="Upcoming: New Chart Models" subtitle="Planned" />
          <q-timeline-entry title="Upcoming: Export CSV to Excel" subtitle="Planned" />
        </q-timeline>
      </div>

      <!-- Footer -->
      <q-separator dark spaced class="q-my-lg" />
      <div class="text-center q-mt-xl">
        <q-icon name="email" size="md" class="q-mr-sm" />
        <span class="text-subtitle1">Contact: <a href="mailto:dbzytb37@gmail.com" class="text-white">dbzytb37@gmail.com</a></span>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// No specific script needed for static content
</script>

<style scoped>
a {
  text-decoration: underline;
}
</style>
