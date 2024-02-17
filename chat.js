import { loadCSS, loadScript } from '../helpers';
import { getWebSocket } from './web-socket';

const ar_AR = {
  labelIdle: 'اسحب و ادرج ملفاتك أو <span class="filepond--label-action"> تصفح </span>',
  labelInvalidField: 'الحقل يحتوي على ملفات غير صالحة',
  labelFileWaitingForSize: 'بانتظار الحجم',
  labelFileSizeNotAvailable: 'الحجم غير متاح',
  labelFileLoading: 'بالإنتظار',
  labelFileLoadError: 'حدث خطأ أثناء التحميل',
  labelFileProcessing: 'يتم الرفع',
  labelFileProcessingComplete: 'تم الرفع',
  labelFileProcessingAborted: 'تم إلغاء الرفع',
  labelFileProcessingError: 'حدث خطأ أثناء الرفع',
  labelFileProcessingRevertError: 'حدث خطأ أثناء التراجع',
  labelFileRemoveError: 'حدث خطأ أثناء الحذف',
  labelTapToCancel: 'انقر للإلغاء',
  labelTapToRetry: 'انقر لإعادة المحاولة',
  labelTapToUndo: 'انقر للتراجع',
  labelButtonRemoveItem: 'مسح',
  labelButtonAbortItemLoad: 'إلغاء',
  labelButtonRetryItemLoad: 'إعادة',
  labelButtonAbortItemProcessing: 'إلغاء',
  labelButtonUndoItemProcessing: 'تراجع',
  labelButtonRetryItemProcessing: 'إعادة',
  labelButtonProcessItem: 'رفع',
  labelMaxFileSizeExceeded: 'الملف كبير جدا',
  labelMaxFileSize: 'حجم الملف الأقصى: {filesize}',
  labelMaxTotalFileSizeExceeded: 'تم تجاوز الحد الأقصى للحجم الإجمالي',
  labelMaxTotalFileSize: 'الحد الأقصى لحجم الملف: {filesize}',
  labelFileTypeNotAllowed: 'ملف من نوع غير صالح',
  fileValidateTypeLabelExpectedTypes: 'تتوقع {allButLastType} من {lastType}',
  imageValidateSizeLabelFormatError: 'نوع الصورة غير مدعوم',
  imageValidateSizeLabelImageSizeTooSmall: 'الصورة صغير جدا',
  imageValidateSizeLabelImageSizeTooBig: 'الصورة كبيرة جدا',
  imageValidateSizeLabelExpectedMinSize:
    'الحد الأدنى للأبعاد هو: {minWidth} × {minHeight}',
  imageValidateSizeLabelExpectedMaxSize:
    'الحد الأقصى للأبعاد هو: {maxWidth} × {maxHeight}',
  imageValidateSizeLabelImageResolutionTooLow: 'الدقة ضعيفة جدا',
  imageValidateSizeLabelImageResolutionTooHigh: 'الدقة مرتفعة جدا',
  imageValidateSizeLabelExpectedMinResolution: 'أقل دقة: {minResolution}',
  imageValidateSizeLabelExpectedMaxResolution: 'أقصى دقة: {maxResolution}',
};

let chatSocket;

var visibilityHidden, visibilityChange;
// Opera 12.10 and Firefox 18 and later support
if (typeof document.hidden !== 'undefined') {
  visibilityHidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
  visibilityHidden = 'mozHidden';
  visibilityChange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  visibilityHidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  visibilityHidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

// Scroll to bottom in chat section
function scrollToBottom() {
  var chatBox = document.querySelector('#discuss-section div');

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Create file input
function newFileInput() {
  // Get CSRF token
  const CSRFToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

  // Get a reference to the file input element
  const fileInput = document.querySelector('#file-input');

  FilePond.registerPlugin(
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
  );

  FilePond.setOptions({
    server: {
      url: '/chat/save-file/',
      headers: { 'X-CSRFToken': CSRFToken },
      process: {
        ondata: (formData) => {
          formData.append('csrfmiddlewaretoken', CSRFToken);
          return formData;
        },
      },
    },
  });
  FilePond.setOptions(ar_AR);

  // Create a FilePond instance
  return FilePond.create(fileInput);
}

function destroyFileInput() {
  FilePond.find(document.querySelector('#file-input')).destroy();
  document.querySelector('#upload-file').checked = false;
  document.querySelector('#upload-message').classList.add('hidden');
}

export function activateChatForm() {
  try {
    document.querySelector('#chat-form fieldset').removeAttribute('disabled');
    document.querySelector('#chat-form .animate-spin').classList.add('hidden');
    document.querySelector('#chat-form .send-message').classList.remove('hidden');
  } catch (e) {}
}

export function deActivateChatForm() {
  try {
    document.querySelector('#chat-form fieldset').setAttribute('disabled', '');
    document.querySelector('#chat-form .animate-spin').classList.remove('hidden');
    document.querySelector('#chat-form .send-message').classList.add('hidden');
  } catch (e) {}
}

function sendRecord() {
  const recorder = document.querySelector('#recorder');
  if (recorder) {
    document
      .querySelector('#recorder')
      .addEventListener('voiceRecordingComplete', (event) => {
        chatSocket.send(JSON.stringify({ message: '', files: [event.detail.fileId] }));
      });
  }
}

function sendMessage(pond, chatSocket) {
  if (pond && pond.status === 3) {
    document.querySelector('#upload-message').classList.remove('hidden');
  } else {
    const message = document.getElementById('chat-message-input');
    let data = { message: message.value };

    if (pond && pond.status === 4) {
      data = Object.assign({}, data, {
        files: pond.getFiles().map((file) => JSON.parse(file.serverId).id),
      });
      destroyFileInput();
    }

    chatSocket.send(JSON.stringify(data));
    message.value = '';
    message.focus();
  }
}

// Live chat
up.compiler('#discuss-section', () => {
  scrollToBottom();

  const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
  const roomPath = JSON.parse(document.getElementById('json-roompath').textContent);
  const userName = JSON.parse(document.getElementById('json-username').textContent);
  const chatForm = document.getElementById('chat-form');
  if (chatForm) {
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/filepond/4.30.4/filepond.min.css');

    loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/filepond/4.30.4/filepond.min.js',
    );

    loadScript(
      'https://unpkg.com/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.js',
    );

    loadScript(
      'https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js',
    );
    chatSocket = newChatSocket();
    if (chatSocket.readyState == WebSocket.OPEN) {
      activateChatForm();
    }


    function handleChatSocketError() {
      deActivateChatForm();
      chatSocket = newChatSocket();
    }

    function newChatSocket() {
      var newSocket = new getWebSocket('/ws/' + roomPath + '/' + roomName + '/');

      newSocket.onopen = activateChatForm;
      newSocket.onclose = handleChatSocketError;
      newSocket.onmessage = chatMessages;
      newSocket.onerror = handleChatSocketError;

      return newSocket;
    }

    var file = null;
    var pond;

    up.on('change', '#upload-file', (event, el) => {
      if (el.checked) {
        pond = newFileInput();
      } else {
        destroyFileInput();
      }
    });

    sendRecord();

    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      sendMessage(pond, chatSocket);
    });

    function chatMessages(e) {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.type === 'chat_message') {
        const chatContainer = document.querySelector('#discuss-section div');
        var messageFiles = '';

        if (data.message.files && data.message.files.length > 0) {
          data.message.files.forEach((file) => {
            console.log(file.name);
              if (file.mimetype.includes('audio')) {
                try {
                  document.querySelector('#message-last-record').parentElement.remove();
                  window.onbeforeunload = function () {};
                  activateChatForm();
                } catch (e) {}
                messageFiles += `<audio controls controlsList="nodownload noplaybackrate" preload="none" class="max-w-[100%] min-w-[10rem]"><source src="${file.file}" ></audio>`;
              } else if (file.mimetype.includes('image')) {
                messageFiles += `<img src="${file.file}" class="aspect-[3/2] bg-gray-50 rounded-xl mb-2 lazyloaded" alt="${file.name}" width="250px">`;
              } else if (file.mimetype.includes('video')) {
                  messageFiles += `<video src="${file.file}" class="aspect-[3/2] bg-gray-50 rounded-xl mb-2 lazyloaded" alt="${file.name}" width="250px" controls preload="none"></video>`;
              } else {
                messageFiles += `<a href="${file.file}" class="block bg-primary px-3 py-1.5 rounded-full space-x-2 space-x-reverse text-gray-300 text-[13px]" target="_blank" title="${file.name}"> <span>${file.name.slice(0, 20)}</span> <svg class="inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="16" width="16"> <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd"></path> </svg> </a>`;
              }
          });
        }

        if (data.message.user.username === userName) {
          var messageDir = 'dir="rtl"';
          var messageStyle = 'bg-sky-100 rounded-tr-none';
          var messageBoxStyle = 'space-x-reverse';
        } else {
          var messageDir = 'dir="ltr"';
          var messageStyle = 'bg-white rounded-tl-none';
          var messageBoxStyle = ' ';
        }

        if (
          data.last_message != null &&
          data.last_message.user.username === data.message.user.username
        ) {
          const lastMessage = document.getElementById(
            `message-${data.last_message.id}`,
          );

          lastMessage.insertAdjacentHTML(
            'afterend',

            `<div id="message-${data.message.id}" class="space-y-2 w-fit max-w-[100%] min-w-[4rem] chat-message" sender="${data.message.user.username}">
                    <p class="${messageStyle} leading-[1.75] px-4 py-3 rounded-xl shadow-sm text-gray-700 text-right break-words">
                        <span>${data.message.message}</span> ${messageFiles}
                    </p>
                </div>`,
          );
        } else {
          if (
            data.last_message != null &&
            data.last_message.date.date !== data.message.date.date
          ) {
            var date = `<div class="relative">
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div class="w-full border-t"></div>
                                </div>
                                <div class="relative flex justify-center">
                                    <span class="bg-gray-100 px-2 text-gray-500 text-sm">اليوم</span>
                                </div>
                            </div>`;
          } else {
            var date = ' ';
          }

          chatContainer.innerHTML =
            chatContainer.innerHTML +
            `<div class="space-y-4 select-none" ${messageDir}> ${date} <div class="flex items-start space-x-3  w-full ${messageBoxStyle}"> <a href="#" class="flex items-center flex-shrink-0" title="${data.message.user.first_name} ${data.message.user.last_name}"> <img src="${data.message.user.image}" class="aspect-square bg-white h-10 rounded-full shadow-sm w-10" alt="صورة المستخدم" /> </a> <div class="space-y-2 w-full"> <div id="message-${data.message.id}" class="space-y-2 w-fit max-w-[100%] min-w-[4rem] chat-message" sender="${data.message.user.username}"> <p class="${messageStyle} leading-[1.75] px-4 py-3 rounded-xl shadow-sm text-gray-700 text-right break-words"> <span>${data.message.message}</span> ${messageFiles} </p> </div> </div> </div> </div>`;
        }

        scrollToBottom();
        if (data.message.user.username == userName) {
          console.log(document.querySelector(`#message-${data.message.id}`));
          document.querySelector(`#message-${data.message.id}`).classList.add('sent');
          document.querySelector(
            `#message-${data.message.id} p`,
          ).innerHTML += `<span class="flex justify-end mb-[-0.25rem] ml-[-0.35rem]"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="10" width="10"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></span>`;
        } else {
          // send read event when receive new message from another user
          chatSocket.send(
            JSON.stringify({
              type: 'read_message',
              message: data.message.id,
            }),
          );
        }
      } else if (data.type == 'delete_message') {
        // if delete message remove the message for both the sender and the receiver
        document.querySelector(`#message-${data.message}`).remove();
        document
          .querySelector('.space-y-4.select-none .space-y-2:not(:has(*))')
          .parentElement.parentElement.remove();
      } else if (data.type == 'read_message') {
        // if read message add seen class for sender
        if (data.message.user == userName) {
          console.log(document.querySelector(`#message-${data.message.id}`));
          document.querySelector(`#message-${data.message.id}`).classList.add('seen');
          document.querySelector(
            `#message-${data.message.id} p span:nth-child(2)`,
          ).innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="10" width="10"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`;
        }
      }
    }

    up.on('keypress', '#chat-message-input', (event, el) => {
      if (event.which === 13) {
        event.preventDefault();
        if (chatForm.checkValidity()) {
          sendMessage(pond, chatSocket);
        } else {
          chatForm.reportValidity();
        }
      }
    });


    up.on('click', '.delete-chat-message', (event, el) => {
      chatSocket.send(
        JSON.stringify({
          type: 'delete_message',
          message: el.getAttribute('message-id'),
        }),
      );
    });

    document.addEventListener(visibilityChange, (e) => {
      console.log(document.visibilityState);
      if (!document[visibilityHidden]) {
        console.log(chatSocket.readyState, WebSocket.CLOSED);
        if (chatSocket.readyState == WebSocket.CLOSED) {
          console.log('chatSocket reconnecting...');
          chatSocket = newChatSocket();
        }
      }
    });
  }
});

// Get meeting data (video orders)
up.compiler('#json-user-role', () => {
  var roomName = '';
  const userName = JSON.parse(document.getElementById('json-username').textContent);
  const roleName = JSON.parse(document.getElementById('json-user-role').textContent);
  const sellerUserName = JSON.parse(
    document.getElementById('json-seller-username').textContent,
  );
  try {
    var roomName = JSON.parse(document.getElementById('json-roomname').textContent);
  } catch {}

  const CSRFToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
  var joinMeetingButton = document.querySelector('#join-meeting-button');
  var joined = null;

  const meetingSocket = new getWebSocket('/ws/meeting/' + sellerUserName + '/');
  meetingSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data);
    if (data.meeting_data.event == 'meeting.participant_joined') {
      joined = true;
    }
    if (
      data.meeting_data.event === 'meeting.ended' ||
      (data.meeting_data.event == 'meeting.participant_left' &&
        ((data.meeting_data.metadata.toString() == roomName.toString() &&
          data.meeting_data.complete) ||
          (data.meeting_data.roleName == 'host' && roleName == 3)))
    ) {
      if (data.meeting_data.complete) {
        window.location.replace(
          location.protocol +
            '//' +
            location.host +
            location.pathname +
            '?complete_popup=True',
        );
      } else {
        window.location.replace(
          location.protocol + '//' + location.host + location.pathname,
        );
      }
      meetingSocket.close();
    }
    try {
      if (!document.querySelector('.tabs-content iframe')) {
        up.render({
          target: '#discuss-section',
          url: window.location.toString(),
          clearCache: true,
        });
      }
    } catch (e) {}

    try {
      if (roleName == 3) {
        up.render({
          target: '#manage-meeting',
          url: window.location.toString(),
          clearCache: true,
        });
        up.render({
          target: '#manage-orders',
          url: window.location.toString(),
          clearCache: true,
        });
      }
    } catch (e) {}
  };
  up.on('click', '.complete-order', (event, el) => {
    var orderId = el.getAttribute('order-id');
    var url = `/api/orders/my-orders/${orderId}/`
    const VITE_ABBER_API_KEY = import.meta.env.VITE_ABBER_API_KEY;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': CSRFToken,
      'api-key': VITE_ABBER_API_KEY,
    });
    const body = JSON.stringify({
      change_status: 'awaiting_delivery',
      csrfmiddlewaretoken: CSRFToken,
    });

    fetch(url, {
      method: 'PUT',
      headers: headers,
      body: body,
    })
      .then((response) => {
        console.log(response);
        document.querySelector('#manage-meeting').click();
        meetingSocket.send(
          JSON.stringify({
            meeting_data: {
              event: 'meeting.participant_left',
              metadata: orderId,
              complete: true,
            },
          }),
        );
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

function insertMeetingIframe() {
  const joinMeetingButton = document.querySelector('#join-meeting-button');
  const iframe = document.createElement('iframe');
  // Insert meeting iframe
  iframe.src = joinMeetingButton.getAttribute('meeting-url');
  iframe.setAttribute(
    'allow',
    'camera; microphone; fullscreen; speaker; display-capture; autoplay;',
  );
  iframe.classList.add(
    'w-full',
    'max-w-screen-md',
    'm-auto',
    'h-[32em]',
    // 'bg-light',
    'rounded-lg',
    'space-x-2',
    'space-x-reverse',
    //'pb-6'
  );
  document.querySelector('.meeting-section').replaceChildren(iframe);
}

up.compiler('#join-meeting-button', () => {
  const url = new URL(window.location.href);
  if (url.searchParams.get('get_meeting') === 'true') {
    insertMeetingIframe();
  }

  up.on('click', '#join-meeting-button', (event, el) => {
    insertMeetingIframe();
  });
});

up.compiler('.meeting-section', () => {
  const CSRFToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
  const roomName = document.getElementById('json-roomname');
  if (roomName && roomName.textContent) {
    const orderSocket = new getWebSocket(
      '/ws/order-status/' + JSON.parse(roomName.textContent) + '/',
    );
    orderSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.status === 'awaiting_delivery') {
        window.location.replace(
          location.protocol +
            '//' +
            location.host +
            location.pathname +
            '?complete_popup=True',
        );
      }
    };
  }

  up.on('click', '.complete-order', (event, el) => {
    const orderId = el.getAttribute('order-id');
    const url = `/api/orders/my-orders/${orderId}/`;
    const VITE_ABBER_API_KEY = import.meta.env.VITE_ABBER_API_KEY;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': CSRFToken,
      'api-key': VITE_ABBER_API_KEY,
    });
    const body = JSON.stringify({
      change_status: 'awaiting_delivery',
      csrfmiddlewaretoken: CSRFToken,
    });

    fetch(url, {
      method: 'PUT',
      headers: headers,
      body: body,
    })
      .then((response) => {
        console.log(response);
        orderSocket.send(
          JSON.stringify({
            status: 'awaiting_delivery',
          }),
        );
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
