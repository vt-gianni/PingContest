<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ParticipationRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ParticipationRepository::class)
 * @ApiResource(
 *     itemOperations={},
 *     collectionOperations={
 *          "get"={
 *              "access_control"="object.user == user"
 *          }, "post"={
 *              "method"="post",
 *              "path"="/participations",
 *              "controller"="App\Controller\CreateParticipationController",
 *              "openapi_context"={
 *                  "summary"="Crée une participation."
 *              }
 *          }
 *     }
 * )
 */
class Participation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="participations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=ContestCategory::class, inversedBy="participations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $contestCategory;

    /**
     * @ORM\Column(type="boolean")
     */
    private $validated;

    /**
     * @ORM\Column(type="datetime")
     */
    private $joinDate;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getContestCategory(): ?ContestCategory
    {
        return $this->contestCategory;
    }

    public function setContestCategory(?ContestCategory $contestCategory): self
    {
        $this->contestCategory = $contestCategory;

        return $this;
    }

    public function getValidated(): ?bool
    {
        return $this->validated;
    }

    public function setValidated(bool $validated): self
    {
        $this->validated = $validated;

        return $this;
    }

    public function getJoinDate(): ?\DateTimeInterface
    {
        return $this->joinDate;
    }

    public function setJoinDate(\DateTimeInterface $joinDate): self
    {
        $this->joinDate = $joinDate;

        return $this;
    }
}
