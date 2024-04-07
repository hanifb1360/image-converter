
document.getElementById('qualitySlider').addEventListener('input', function() {
    const qualityLabel = document.getElementById('qualityLabel');
    qualityLabel.textContent = this.value + '%';

    // Call handleFiles function to update display immediately
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        handleFiles(fileInput.files);
    }
});

document.getElementById('convertBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityLabel = document.getElementById('qualityLabel');
    const qualityPercentage = parseInt(qualitySlider.value);

    if (file && qualityPercentage >= 1 && qualityPercentage <= 100) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw image onto canvas
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Convert canvas to WebP with specified quality and file size
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.getElementById('downloadLink');
                    a.href = url;
                    a.download = 'converted_image.webp';
                    a.style.display = 'block';
                    const fileSizeDisplay = document.getElementById('fileSize');
                    const fileSize = (blob.size / 1024).toFixed(2); // Convert to KB and round to 2 decimal places
                    fileSizeDisplay.textContent = `File Size: ${fileSize} KB`;
                }, 'image/webp', qualityPercentage / 100); // Convert quality percentage to a number between 0 and 1
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file and enter a valid quality percentage between 1 and 100.');
    }
});

const dropzone = document.getElementById('dropzone');

dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    // Optional: Add visual cues to indicate a valid drop target
});

dropzone.addEventListener('dragleave', (event) => {
    // Optional: Remove visual cues
});

dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        // Handle the files (e.g., upload them)
        console.log(files);
    }
});

document.getElementById('qualitySlider').addEventListener('input', function() {
    const qualityLabel = document.getElementById('qualityLabel');
    qualityLabel.textContent = this.value + '%';
});

// Get the container element
const container = document.querySelector('.container');

// Add event listeners for drag-and-drop
container.addEventListener('dragover', dragOverHandler);
container.addEventListener('dragleave', dragLeaveHandler);
container.addEventListener('drop', dropHandler);

function dragOverHandler(e) {
    e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    e.stopPropagation();
    container.style.backgroundColor = '#e0e0e0'; // Example visual cue
}

function dragLeaveHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    container.style.backgroundColor = ''; // Reset background color
}

// Update the drop zone display when a file is selected through the file input
function updateDropZoneDisplay() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length > 0) {
        const droppedFileName = document.getElementById('droppedFileName');
        droppedFileName.textContent = `Dropped file: ${files[0].name}`;
    }
}

// Update the file input display when a file is dropped
function dropHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const fileInput = document.getElementById('fileInput');
        fileInput.files = files; // Update the file input's value

        // Handle the dropped files
        handleFiles(files);

        // Update the drop zone display
        updateDropZoneDisplay();
    }
}

// Event listener for file input change to update the drop zone display
document.getElementById('fileInput').addEventListener('change', function() {
    updateDropZoneDisplay();
});

function handleFiles(files) {
    const file = files[0]; 
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityLabel = document.getElementById('qualityLabel');
    const qualityPercentage = parseInt(qualitySlider.value); // Use the current value

    if (file && qualityPercentage >= 1 && qualityPercentage <= 100) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw image onto canvas
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Convert canvas to WebP with specified quality and file size
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.getElementById('downloadLink');
                    a.href = url;
                    a.download = 'converted_image.webp';
                    a.style.display = 'block';
                    const fileSizeDisplay = document.getElementById('fileSize');
                    const fileSize = (blob.size / 1024).toFixed(2); // Convert to KB and round to 2 decimal places
                    fileSizeDisplay.textContent = `File Size: ${fileSize} KB`;
                }, 'image/webp', qualityPercentage / 100); // Convert quality percentage to a number between 0 and 1
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Update quality label
        qualityLabel.textContent = qualityPercentage + '%';
    } else {
        alert('Please select a valid file and enter a valid quality percentage between 1 and 100.');
    }
}

document.getElementById('fileInput').addEventListener('change', function() {
    const files = this.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});