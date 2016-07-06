<?php

use Phalcon\Mvc\Model\Criteria;
use Phalcon\Paginator\Adapter\Model as Paginator;


class RecordsController extends ControllerBase
{
    /**
     * Index action
     */
    public function indexAction()
    {
        $this->persistent->parameters = null;
    }

    /**
     * Searches for records
     */
    public function searchAction($numberPage = 1)
    {
        if ($this->request->isPost()) {
            $query = Criteria::fromInput($this->di, 'Records', $_POST);
            $query->andWhere("ip='" . $this->request->getClientAddress() . "'");
            $this->persistent->parameters = $query->getParams();
        } else {
            if ($this->request->hasQuery("page")) {
                $numberPage = $this->request->getQuery("page", "int", 1);
            }
        }

        $parameters = $this->persistent->parameters;
        if (!is_array($parameters)) {
            $parameters = array();
        }
        $parameters["order"] = "id";

        $records = Records::find($parameters);
        if (count($records) == 0) {
            $this->flash->notice("The search did not find any records");

            $this->dispatcher->forward(array(
                "controller" => "records",
                "action"     => "index"
            ));

            return;
        }

        $paginator = new Paginator(array(
            'data'  => $records,
            'limit' => 10,
            'page'  => $numberPage
        ));

        $this->view->page = $paginator->getPaginate();
    }

    /**
     * Displays the creation form
     */
    public function newAction()
    {

    }

    /**
     * Edits a record
     *
     * @param string $id
     */
    public function editAction($id)
    {
        if (!$this->request->isPost()) {

            $record = Records::findFirstByid($id);
            if (!$record) {
                $this->flash->error("record was not found");

                $this->dispatcher->forward(array(
                    'controller' => "records",
                    'action'     => 'index'
                ));

                return;
            }

            $this->view->id = $record->id;

            $this->tag->setDefault("id", $record->id);
            $this->tag->setDefault("name", $record->name);
            $this->tag->setDefault("file", $record->file);
            $this->tag->setDefault("subtitles", $record->subtitles);
            $this->tag->setDefault("type", $record->type);
            $this->tag->setDefault("ip", $record->ip);
            $this->tag->setDefault("created", $record->created);

        }
    }

    /**
     * View a record
     *
     * @param string $id
     */
    public function viewAction($id)
    {

        $record = Records::findFirstByid($id);
        if (!$record) {
            $this->flash->error("record was not found");

            $this->dispatcher->forward(array(
                'controller' => "records",
                'action'     => 'index'
            ));

            return;
        }

        $this->view->id = $record->id;
        $this->view->record = $record;

    }

    /**
     * Creates a new record
     */
    public function createAction()
    {
        if (!$this->request->isPost()) {
            $this->dispatcher->forward(array(
                'controller' => "records",
                'action'     => 'index'
            ));

            return;
        }

        $record = new Records();
        $record->name = $this->request->getPost("name");
        $record->file = $this->request->getPost("file");
        $record->subtitles = $this->request->getPost("subtitles");
        $record->type = $this->request->getPost("type");


        if (!$record->save()) {
            foreach ($record->getMessages() as $message) {
                $this->flash->error($message);
            }

            $this->dispatcher->forward(array(
                'controller' => "records",
                'action'     => 'new'
            ));

            return;
        }

        $this->flash->success("записа беше създаден успешно");

        $this->dispatcher->forward(array(
            'controller' => "records",
            'action'     => 'index'
        ));
    }

    /**
     * Saves a record edited
     *
     */
    public function saveAction()
    {

        if (!$this->request->isPost()) {
            $this->dispatcher->forward(array(
                'controller' => "records",
                'action'     => 'index'
            ));

            return;
        }

        $id = $this->request->getPost("id");
        $record = Records::findFirstByid($id);

        if (!$record) {
            $this->flash->error("record does not exist " . $id);

            $this->dispatcher->forward(array(
                'controller' => "records",
                'action'     => 'index'
            ));

            return;
        }

        $record->name = $this->request->getPost("name");
        $record->file = $this->request->getPost("file");
        $record->subtitles = $this->request->getPost("subtitles");
        $record->type = $this->request->getPost("type");


        if (!$record->save()) {

            foreach ($record->getMessages() as $message) {
                $this->flash->error($message);
            }

            $this->dispatcher->forward(array(
                'controller' => "records",
                'action'     => 'edit',
                'params'     => array($record->id)
            ));

            return;
        }

        $this->flash->success("записа е записан успешно");

        $this->dispatcher->forward(array(
            'controller' => "records",
            'action'     => 'index'
        ));
    }

    /**
     * Deletes a record
     *
     * @param string $id
     */
    public function deleteAction($id)
    {
        $record = Records::findFirstByid($id);
        if (!$record) {
            $this->flash->error("record was not found");

            $this->dispatcher->forward(array(
                'controller' => "records",
                'action'     => 'index'
            ));

            return;
        }

        if (!$record->delete()) {

            foreach ($record->getMessages() as $message) {
                $this->flash->error($message);
            }

            $this->dispatcher->forward(array(
                'controller' => "records",
                'action'     => 'search'
            ));

            return;
        }

        $this->flash->success("записа беше изтрит успешно");

        $this->dispatcher->forward(array(
            'controller' => "records",
            'action'     => "index"
        ));
    }

    public function ajaxAction()
    {
        $this->view->disable();
        foreach (array('video', 'audio') as $type) {
            if (isset($_FILES["${type}-blob"])) {

                $fileName = $_POST["${type}-filename"];
                $subtitles = $_POST["${type}-subtitles"];
                $uploadDirectory = __DIR__ . '/../../public/uploads/';

                $array = json_decode($subtitles);

                if (!move_uploaded_file($_FILES["${type}-blob"]["tmp_name"], $uploadDirectory . $fileName)) {
                    echo(" problem moving uploaded file");
                } else {

                    //Create Record
                    $record = new Records();
                    $record->name = $fileName;
                    $record->file = "/uploads/" . $fileName;
                    $record->type = "Video";

                    if (!empty($array)) {
                        $subPath = $uploadDirectory . $fileName . ".vtt";
                        $myfile = fopen($subPath, "w");
                        if ($myfile !== false) {
                            fwrite($myfile, "WEBVTT FILE\n\n");
                            foreach ($array as $nr => $row) {
                                fwrite($myfile, $nr . "\n");
                                if ($nr < 10) {
                                    $minute = "0" . $nr;
                                } else {
                                    $minute = $nr;
                                }
                                $next = $nr + 1;
                                if ($next < 10) {
                                    $minute2 = "0" . $next;
                                } else {
                                    $minute2 = $next;
                                }
                                fwrite($myfile, "00:" . $minute . ":00.000 --> 00:" . $minute2 . ":00.000\n");
                                fwrite($myfile, $row . "\n");
                                fwrite($myfile, "\n");
                            }
                            fclose($myfile);
                            $record->subtitles = "/uploads/" . $fileName . ".vtt";
                        }
                    }

                    if (!$record->save()) {
                        foreach ($record->getMessages() as $message) {
                            echo $message;
                        }
                    } else {

                        $json = array(
                            "video" => $record->file
                        );
                        if (isset($record->subtitles) && !empty($record->subtitles)) {
                            $json['subtitles'] = $record->subtitles;
                        }
                        $this->response->setContent(json_encode($json));
                        return $this->response;

                        //echo "Successfuly uploaded video with ID (".$record->id."). You can see it at: ".$record->file;
                    }
                }

            }
        }
    }

    public function recordAction()
    {

    }

}
