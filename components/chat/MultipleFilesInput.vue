<template>
  <div>
    <FilePond class="filepond target mt-4" ref="pond" @processfile="addFile" name="file" :allow-multiple="true" :maxFiles="3" imagePreviewMaxHeight="60" maxFileSize="3MB" accepted-file-types="image/*, application/pdf, video/mp4" :server="server" />
  </div>
</template>

<script setup lang="ts">
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
const config = useRuntimeConfig();
const { rawToken } = await useAuthState();
const FilePond = vueFilePond(FilePondPluginImagePreview, FilePondPluginFileValidateSize);
const emit = defineEmits(["update:modelValue"]);
const files = ref<File[]>([]);
const pond = ref(false);
defineComponent({
  components: {
    FilePond,
  },
});

const ar_AR = {
  labelIdle: 'اسحب و ادرج ملفاتك أو <span class="filepond--label-action"> تصفح </span>',
  labelInvalidField: "الحقل يحتوي على ملفات غير صالحة",
  labelFileWaitingForSize: "بانتظار الحجم",
  labelFileSizeNotAvailable: "الحجم غير متاح",
  labelFileLoading: "بالإنتظار",
  labelFileLoadError: "حدث خطأ أثناء التحميل",
  labelFileProcessing: "يتم الرفع",
  labelFileProcessingComplete: "تم الرفع",
  labelFileProcessingAborted: "تم إلغاء الرفع",
  labelFileProcessingError: "حدث خطأ أثناء الرفع",
  labelFileProcessingRevertError: "حدث خطأ أثناء التراجع",
  labelFileRemoveError: "حدث خطأ أثناء الحذف",
  labelTapToCancel: "انقر للإلغاء",
  labelTapToRetry: "انقر لإعادة المحاولة",
  labelTapToUndo: "انقر للتراجع",
  labelButtonRemoveItem: "مسح",
  labelButtonAbortItemLoad: "إلغاء",
  labelButtonRetryItemLoad: "إعادة",
  labelButtonAbortItemProcessing: "إلغاء",
  labelButtonUndoItemProcessing: "تراجع",
  labelButtonRetryItemProcessing: "إعادة",
  labelButtonProcessItem: "رفع",
  labelMaxFileSizeExceeded: "الملف كبير جدا",
  labelMaxFileSize: "حجم الملف الأقصى: {filesize}",
  labelMaxTotalFileSizeExceeded: "تم تجاوز الحد الأقصى للحجم الإجمالي",
  labelMaxTotalFileSize: "الحد الأقصى لحجم الملف: {filesize}",
  labelFileTypeNotAllowed: "ملف من نوع غير صالح",
  fileValidateTypeLabelExpectedTypes: "تتوقع {allButLastType} من {lastType}",
  imageValidateSizeLabelFormatError: "نوع الصورة غير مدعوم",
  imageValidateSizeLabelImageSizeTooSmall: "الصورة صغير جدا",
  imageValidateSizeLabelImageSizeTooBig: "الصورة كبيرة جدا",
  imageValidateSizeLabelExpectedMinSize: "الحد الأدنى للأبعاد هو: {minWidth} × {minHeight}",
  imageValidateSizeLabelExpectedMaxSize: "الحد الأقصى للأبعاد هو: {maxWidth} × {maxHeight}",
  imageValidateSizeLabelImageResolutionTooLow: "الدقة ضعيفة جدا",
  imageValidateSizeLabelImageResolutionTooHigh: "الدقة مرتفعة جدا",
  imageValidateSizeLabelExpectedMinResolution: "أقل دقة: {minResolution}",
  imageValidateSizeLabelExpectedMaxResolution: "أقصى دقة: {maxResolution}",
};

const server = {
  url: `/api/chat/files/`,
  headers: {
    Authorization: `JWT ${rawToken.value}`,
  },

  process: {
    ondata: (formData) => {
      console.log(formData);
      return formData;
    },
  },
};

const addFile = (error, file) => {
  files.value.push(file.serverId);
  emit("update:modelValue", files.value);
  console.log(file.serverId);
};
onMounted(() => {
  pond.value._pond.setOptions(ar_AR);
});
</script>

<style scoped>
/* Filepond */
.filepond--root {
  @apply font-sans !important;
}

.filepond--panel-root {
  @apply border border-dashed bg-transparent !important;
}

.filepond--credits {
  @apply hidden !important;
}
</style>
