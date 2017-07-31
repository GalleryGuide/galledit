(function ($, Drupal) {
  /**
   * Disable address form until map entry complete.
   */
  Drupal.behaviors.gallAddress = {
    attach: function (context, settings) {
      var $addressWrapper = $('#edit-field-address-wrapper');

      $('.geocode-controls-wrapper').on('blur', 'input', function() {
        $addressWrapper.css('visibility', 'visible');
      });
    }
  };

})(jQuery, Drupal);