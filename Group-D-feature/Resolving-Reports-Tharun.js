// Reaction button click handler
document.querySelectorAll('.reaction-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.parentElement;

    // Remove active class from all buttons in the row
    row.querySelectorAll('.reaction-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update user reaction label
    const label = row.nextElementSibling.querySelector('.userReactionLabel');
    label.innerText = btn.dataset.type;

    // Increment visual count
    const span = btn.querySelector('span');
    span.innerText = parseInt(span.innerText) + 1;
  });
});
