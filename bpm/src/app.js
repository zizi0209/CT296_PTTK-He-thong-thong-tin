import BpmnViewer from 'bpmn-js';
import exampleDiagram from '../resources/pizza-collaboration.bpmn';

// initialize viewer bound to #canvas element
const viewer = new BpmnViewer({
  container: '#canvas'
});

async function openDiagram(xml) {
  try {
    const { warnings } = await viewer.importXML(xml);

    if (warnings && warnings.length) {
      console.warn('import warnings', warnings);
    }

    viewer.get('canvas').zoom('fit-viewport');
  } catch (err) {
    const { warnings, message } = err;
    console.error('import error', warnings, message);
  }
}

function hookFileInput() {
  const fileInput = document.querySelector('#diagram-file');
  const exampleButton = document.querySelector('#load-example');

  if (fileInput) {
    fileInput.addEventListener('change', async (event) => {
      const [file] = event.target.files || [];

      if (!file) {
        return;
      }

      try {
        const contents = await file.text();
        await openDiagram(contents);
      } catch (err) {
        console.error('failed to read file', err);
      }
    });
  }

  if (exampleButton) {
    exampleButton.addEventListener('click', () => openDiagram(exampleDiagram));
  }
}

hookFileInput();
openDiagram(exampleDiagram);

// helpful references for debugging in the browser console
window.bpmnViewer = viewer;
window.openDiagram = openDiagram;
