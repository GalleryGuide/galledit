(function ($, Drupal) {
  /**
   * Disable address form until map entry complete.
   */
  Drupal.behaviors.gallAddress = {
    attach: function (context, settings) {
      var $addressWrapper = $('#edit-field-address-wrapper');
      $('.geocode-controls-wrapper input').change(function() {
        $addressWrapper.css('visibility', 'visible');
      });
    }
  };

})(jQuery, Drupal);