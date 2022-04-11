<?php


namespace App\Service;


class PictureService
{
    /**
     * @param string $base64_string
     * @param string $output_file
     * @return bool
     */
    function base64_to_jpeg(string $base64_string, string $output_file): bool
    {
        if (!strpos($base64_string, '.jpeg')) {
            $ifp = fopen('img/avatar/' . $output_file, 'wb');
            fwrite($ifp, base64_decode($base64_string));
            fclose($ifp);
            return true;
        }
        return false;
    }
}