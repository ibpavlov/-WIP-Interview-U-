<?php

class Records extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $name;

    /**
     *
     * @var string
     */
    public $file;

    /**
     *
     * @var string
     */
    public $subtitles;

    /**
     *
     * @var string
     */
    public $type;

    /**
     *
     * @var string
     */
    public $ip;

    /**
     *
     * @var string
     */
    public $created;

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'records';
    }

    /**
     *  Runs before record is created and set date of creation and IP
     */
    public function beforeCreate()
    {
        date_default_timezone_set("Europe/Sofia");
        $this->created = date("Y-m-d H:i:s");

        $ipAddress = $this->getDI()->getRequest()->getClientAddress();
        $this->ip = $ipAddress;
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Records[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Records
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
