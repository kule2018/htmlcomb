$(function () {

  'use strict';

  var $source = $('#source'),
      $result = $('#result'),
      htmlcomb = new HTMLComb(),
      console = window.console || { log: $.noop },
      format = function () {
        htmlcomb.format($source.val(), function (result) {
          $result.val(result);
        });
      };

  $source.on('keyup change', format);

  $('.container').on('click', '[data-toggle]', function (e) {
    var $this = $(this),
        $parent = $this.parent(),
        toggle = $this.data('toggle');

    if ($parent.hasClass('active')) {
      return;
    }

    e.preventDefault();

    $parent.addClass('active').siblings().removeClass('active');

    switch (toggle) {
      case 'reset':
        $source.val('');
        $result.val('');
        break;

      case 'example':
        $.get('example.html').done(function (text) {
          $source.val(text);
          format();
        });
        break;
    }

  });
});
