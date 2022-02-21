<?php

namespace App\Repository;

use App\Entity\ContestCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ContestCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method ContestCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method ContestCategory[]    findAll()
 * @method ContestCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContestCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ContestCategory::class);
    }

    // /**
    //  * @return ContestCategory[] Returns an array of ContestCategory objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ContestCategory
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
