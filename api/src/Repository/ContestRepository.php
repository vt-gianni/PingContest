<?php

namespace App\Repository;

use App\Entity\Contest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator as ApiPlatformPaginator;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

/**
 * @method Contest|null find($id, $lockMode = null, $lockVersion = null)
 * @method Contest|null findOneBy(array $criteria, array $orderBy = null)
 * @method Contest[]    findAll()
 * @method Contest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Contest::class);
    }

    /**
     * @param string $page
     * @return ApiPlatformPaginator
     * @throws Exception
     */
    public function getComingContests(string $page): ApiPlatformPaginator
    {
        $query = $this->createQueryBuilder('c')
            ->andWhere('c.startDate > :currentDate')
            ->setParameter('currentDate', new \DateTime('now', new \DateTimeZone('Europe/Paris')))
            ->orderBy('c.startDate', 'ASC')
            ->setFirstResult(($page - 1) * 10)
            ->setMaxResults(10)
        ;

        $doctrinePaginator = new Paginator($query);
        return new ApiPlatformPaginator($doctrinePaginator);
    }

    /**
     * @param string $page
     * @return ApiPlatformPaginator
     * @throws Exception
     */
    public function getInProgressContests(string $page): ApiPlatformPaginator
    {
        $currentDate = new \DateTime('now', new \DateTimeZone('Europe/Paris'));
        $query = $this->createQueryBuilder('c')
            ->andWhere('c.startDate < :currentDate')
            ->setParameter('currentDate', $currentDate)
            ->andWhere('c.endDate > :currentDateEnd')
            ->setParameter('currentDateEnd', $currentDate)
            ->orderBy('c.startDate', 'ASC')
            ->setFirstResult(($page - 1) * 10)
            ->setMaxResults(10)
        ;

        $doctrinePaginator = new Paginator($query);
        return new ApiPlatformPaginator($doctrinePaginator);
    }

    /**
     * @param string $page
     * @return ApiPlatformPaginator
     * @throws Exception
     */
    public function getDoneContests(string $page): ApiPlatformPaginator
    {
        $query = $this->createQueryBuilder('c')
            ->andWhere('c.endDate < :currentDate')
            ->setParameter('currentDate', new \DateTime('now', new \DateTimeZone('Europe/Paris')))
            ->orderBy('c.endDate', 'DESC')
            ->setFirstResult(($page - 1) * 10)
            ->setMaxResults(10)
        ;

        $doctrinePaginator = new Paginator($query);
        return new ApiPlatformPaginator($doctrinePaginator);
    }


    /*
    public function findOneBySomeField($value): ?Contest
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
