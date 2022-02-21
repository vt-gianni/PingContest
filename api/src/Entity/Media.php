<?php

namespace App\Entity;

use App\Repository\MediaRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MediaRepository::class)
 */
class Media
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Contest::class, inversedBy="media")
     */
    private $contest;

    /**
     * @ORM\ManyToOne(targetEntity=ContestCategory::class, inversedBy="media")
     */
    private $contestCategory;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="media")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContest(): ?Contest
    {
        return $this->contest;
    }

    public function setContest(?Contest $contest): self
    {
        $this->contest = $contest;

        return $this;
    }

    public function getContestCategory(): ?ContestCategory
    {
        return $this->contestCategory;
    }

    public function setContestCategory(?ContestCategory $contestCategory): self
    {
        $this->contestCategory = $contestCategory;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
