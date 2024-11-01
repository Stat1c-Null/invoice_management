<template>
  <div class="flex flex-column gap-5 w-5">
    <div class="flex flex-column gap-2">
      <label for="invoice-name">Name</label>
      <InputText id="invoice-name" :v-model="invoice.name" aria-describedby="username-help" />
      <small id="invoice-help">Enter invoice name</small>
    </div>

    <div class="flex flex-column gap-2">
      <label for="invoice-date">Date</label>
      <Calendar 
        id="invoice-date" 
        v-model="invoice.date"
        showIcon 
        showButtonBar
        dateFormat="dd/mm/yy" 
        :manual-input="false"
        selectionMode="single"
      />
    </div>
    
    <div id="label" class="flex flex-row gap-4">
      <Dropdown 
        id="invoice-client" 
        v-model="invoice.client" 
        :options="clients"
        optionLabel="name" 
        placeholder="Select a Client"
        class="w-full md:w-34rem" />
    </div>

    <div class="flex justify-content-center flex-wrap">
      <Button 
      icon="pi pi-plus" 
      severity="help" 
      rounded 
      outlined 
      aria-label="add" 
      />
    </div>
    

    <!-- Save Button -->
    <div class="p-fluid pt-4">
      <Button
        :label="editMode ? 'Update' : 'Save'"
        :icon="editMode ? 'pi pi-pencil' : 'pi pi-save'"
        class="flex-grow"
        @click="saveInvoice"
      />

      
    </div>
  </div>
  
  <ServiceInput />
  
</template>

<style lang="css" scoped>

</style>
  
<script setup lang="ts">
  import { Invoice, InvoiceStatusOptions, Client } from '../../types';
  import { useClients } from "../../composables/useClients";
  import { useInvoices } from "../../composables/useInvoices";
  import { useServices } from '../../composables/useServices';
  import { initializeInvoice } from '../../utils/initialize';
  import { watchImmediate } from "@vueuse/core";

  // Import the createInvoices function from the composable
  const { createInvoices } = useInvoices();

  //Import the getClients function from the composable
  const { getClients } =  useClients();
  
  //Import the getClients function from the composable
  const { getServices } =  useServices();

  const clients = ref<Client[]>([]);
  // Define props with default value
  const props = defineProps({
    invoice: {
      type: Object as PropType<Invoice>,
      default: initializeInvoice(),
    },
  });

  // Use a reactive reference for invoice state management
  const invoice = ref<Invoice>(props.invoice);

  //Define refs
  const invoiceStatusOptions = ref(InvoiceStatusOptions);

  // Define emits
  const emits = defineEmits(["save"]);

  // Define computed properties
  const editMode = computed(() => !!props.invoice?.id);

  // Watch for changes in the prop and reset if unassigned
  watchImmediate(props, (updated) => {
    console.log(`Props Updated: ${updated}`);
    if (!updated.invoice) {
      invoice.value = initializeInvoice();
    } else {
      invoice.value = updated.invoice;
    }
  });

  const saveInvoice = async () => {
    if (editMode.value) {
      // Update Client
      //await updateInvoice(invoice.value);
    } else {
      // Create Client
      await createInvoices(invoice.value);
    }
    emits("save");
  };

  onMounted (() => {
    getClients().then((data) => {
      if (data) {
        clients.value =  data; 
      }
    });
  });


</script>