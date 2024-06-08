const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const toggleButton = document.querySelector('.toggle-button');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
  content.classList.toggle('expanded');
});
document.addEventListener('DOMContentLoaded', () => {
    fetch('assets.json')
        .then(response => response.json())
        .then(data => {
            const task = data.tasks[0];  // Assuming we are dealing with the first task in the tasks array
            const assetsContainer = document.getElementById('assets-container');

            task.assets.forEach(asset => {
                const assetElement = createAssetContainer(asset);
                assetsContainer.appendChild(assetElement);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

function createAssetContainer(asset) {
    const container = document.createElement('div');
    container.className = 'asset-container';

    const title = document.createElement('h3');
    title.className = 'asset-title';
    title.textContent = asset.asset_title;

    const arrow = document.createElement('span');
    arrow.className = 'arrow';
    arrow.textContent = '▶'; // Use a right arrow character

    const description = document.createElement('p');
    description.className = 'asset-description';
    description.textContent = asset.asset_description;

    arrow.addEventListener('click', () => {
        description.classList.toggle('show');
        arrow.textContent = description.classList.contains('show') ? '▼' : '▶'; // Toggle arrow direction
    });

    const content = document.createElement('div');
    content.className = 'asset-content';

    // Add content based on asset content type
    if (asset.asset_content_type === 'video') {
        const video = document.createElement('iframe');
        video.src = asset.asset_content;
        video.width = "560";
        video.height = "315";
        video.frameBorder = "0";
        video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        video.allowFullscreen = true;
        content.appendChild(video);
    } else if (asset.asset_content_type === 'article') {
        const link = document.createElement('a');
        link.href = asset.asset_content;
        link.textContent = "Read the article";
        link.target = "_blank";
        content.appendChild(link);
    } else if (asset.asset_content_type === 'threadbuilder') {
        content.textContent = "Threadbuilder content goes here.";
    } else {
        content.textContent = "Unknown asset type.";
    }

    container.appendChild(title);
    container.appendChild(arrow);
    container.appendChild(description);
    container.appendChild(content);

    return container;
}
