<?php namespace Bbctop\Core\Skin;

use Backend\Skins\Standard as BackendSkin;

/**
 * Modified backend skin information file.
 *
 * This is modified to include an additional path to override the default layouts.
 *
 */

class BbctopSkin extends BackendSkin
{
    /**
     * {@inheritDoc}
     */
    public function getLayoutPaths()
    {

        if(function_exists('bbctop_skin_path')) {
            return [
                bbctop_skin_path('modules/backend/layouts'),
                $this->skinPath . '/layouts'
            ];
        }else{
            return [$this->skinPath.'/layouts'];
        }
        
    }
}
