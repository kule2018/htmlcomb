$(function () {

  'use strict';

  var console = window.console || { log: $.noop };
  var htmlcomb = new HTMLComb();
  var $source = $('#source');
  var $result = $('#result');

  function format() {
    htmlcomb.format($source.val(), function (result) {
      $result.val(result);
    });
  }

  $source.on('keyup change', format);

  $('.container').on('click', '[data-toggle]', function (e) {
    var $this = $(this);
    var $parent = $this.parent();
    var toggle = $this.data('toggle');

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
