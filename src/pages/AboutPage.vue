<template>
  <q-page class="responsive-container bg-primary">
    <div class="q-px-md q-py-lg">
      <h2 class="text-black text-center q-mb-md">
        About JSON Convert
      </h2>
      <p class="text-body1 q-mb-md text-center">
        JSON Convert is a powerful and intuitive online tool that allows you to convert JSON data into various formats like <strong>CSV</strong>, <strong>tables</strong>, <strong>charts</strong>, and soon <strong>XML</strong>. Designed for developers, analysts, and data enthusiasts, this system ensures a smooth experience in viewing and manipulating structured data.
      </p>

      <q-separator dark spaced class="q-my-lg" />

      <!-- Features -->
      <div class="q-ma-xl">
        <h2 class="text-h5">Key Features</h2>
        <ul class="q-pl-lg">
          <li class="q-mb-sm">Convert JSON to <strong>CSV</strong> format with high accuracy.</li>
          <li class="q-mb-sm">Visualize JSON data as <strong>interactive charts</strong> (bar, pie, etc).</li>
          <li class="q-mb-sm">Export data to <strong>PDF</strong> directly from tables or charts.</li>
          <li class="q-mb-sm">Upcoming: Export JSON to <strong>XML</strong> and <strong>Excel</strong>.</li>
        </ul>
      </div>

     <!-- Release Notes -->
      <div class="q-ma-xl">
        <h2 class="text-h5 text-black">Release Timeline</h2>
        <q-timeline color="green-4" layout="dense">

          <!-- Realizados -->
          <q-timeline-entry title="Project Created" subtitle="24/03" icon="check_circle" icon-color="green-4" />
          <q-timeline-entry title="Chart Visualization Implemented" subtitle="06/05" icon="insert_chart" icon-color="green-4" />
          <q-timeline-entry title="PDF Download Button Added" subtitle="15/05" icon="picture_as_pdf" icon-color="green-4" />
          <q-timeline-entry title="Auth System" subtitle="17/06" icon="lock" icon-color="green-4" />

          <!-- Planejados (com ícone de borda) -->
          <q-timeline-entry subtitle="Planned">
            <template #title>
              <div>Upcoming: XML Conversion Support</div>
            </template>
            <template #icon>
              <q-icon name="mdi-file-xml-outline" class="text-grey-6" style="border: 2px solid currentColor; border-radius: 50%; padding: 6px;" />
            </template>
          </q-timeline-entry>

          <q-timeline-entry subtitle="Planned">
            <template #title>
              <div>Upcoming: New Chart Models</div>
            </template>
            <template #icon>
              <q-icon name="mdi-chart-line-variant" class="text-grey-6" style="border: 2px solid currentColor; border-radius: 50%; padding: 6px;" />
            </template>
          </q-timeline-entry>

          <q-timeline-entry subtitle="Planned">
            <template #title>
              <div>Upcoming: Export CSV to Excel</div>
            </template>
            <template #icon>
              <q-icon name="mdi-file-excel-outline" class="text-grey-6" style="border: 2px solid currentColor; border-radius: 50%; padding: 6px;" />
            </template>
          </q-timeline-entry>

        </q-timeline>
      </div>

      <!-- Footer -->
      <q-separator dark spaced class="q-my-lg" />
      <div class="text-center q-mt-xl">
        <q-icon name="email" size="md" class="q-mr-sm" />
        <span>Contact: <a href="mailto:dbzytb37@gmail.com" class="text-black">dbzytb37@gmail.com  /  </a>
        <a href="mailto:brunoalvez2001@hotmail.com" class="text-black">brunoalvez2001@hotmail.com</a></span>
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
