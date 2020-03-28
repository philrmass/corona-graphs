export function saveData(filePath, data) {
  const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filePath;
  link.click();
  setTimeout(function() {
    URL.revokeObjectURL(url);
  }, 0);
}
