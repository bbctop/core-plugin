<?php namespace Bbctop\Core\Behaviors;

use Lang;
use Event;
use Flash;
use ApplicationException;
use Backend\Classes\ControllerBehavior;


class BbctopController extends ControllerBehavior {

  public function __construct($controller)
  {
    parent::__construct($controller);

  }

}