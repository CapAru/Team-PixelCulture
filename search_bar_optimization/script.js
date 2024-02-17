// Sample data for suggestions (replace with your actual data)
var suggestions = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Marketing',
    'Data Science',
    // Add more suggestions as needed
  ];
  
  $(document).ready(function () {
    var searchBar = $('#searchBar');
    var suggestionsContainer = $('#suggestions-container');
  
    searchBar.on('input', function () {
      var query = $(this).val().toLowerCase();
      showSuggestions(query);
    });
  
    searchBar.focusout(function () {
      setTimeout(function () {
        suggestionsContainer.hide();
      }, 200);
    });
  
    function showSuggestions(query) {
      var filteredSuggestions = suggestions.filter(function (suggestion) {
        return suggestion.toLowerCase().includes(query);
      });
  
      if (query.length === 0) {
        suggestionsContainer.hide();
      } else {
        suggestionsContainer.empty();
        filteredSuggestions.forEach(function (suggestion) {
          suggestionsContainer.append('<div class="suggestion">' + suggestion + '</div>');
        });
  
        suggestionsContainer.show();
      }
    }
  
    suggestionsContainer.on('click', '.suggestion', function () {
      var selectedSuggestion = $(this).text();
      searchBar.val(selectedSuggestion);
      suggestionsContainer.hide();
  
      // Redirect to a specific page based on the selected suggestion
      redirectToPage(selectedSuggestion);
    });
  
    function redirectToPage(selectedSuggestion) {
      // Example: Redirect to a page named after the suggestion (replace with your logic)
      window.location.href = selectedSuggestion.toLowerCase().replace(/\s+/g, '-') + '.html';
    }
  });
  