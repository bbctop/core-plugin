<?php
namespace Bbctop\Core\Validation;

use Illuminate\Contracts\Validation\Rule;

class ChinaPhone implements Rule
{
    protected $wordlist;

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return is_china_phone($value);
    }

    /**
     * Validation callback method.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  array  $params
     * @return bool
     */
    public function validate($attribute, $value, $params)
    {
      // dump($params);
      // $this->wordlist = DB::table('bbctop_checktabooword_tabooword')->where('status', 1)->whereIn('type',$params)->pluck('name');
      return $this->passes($attribute, $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'test3';
    }
}