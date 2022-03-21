<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContestRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ContestRepository::class)
 * @ApiResource(
 *     attributes={
 *          "order"={"startDate": "ASC"}
 *     },
 *     collectionOperations={
 *          "get",
            "coming"={
 *              "method"="get",
 *              "path"="/contests/coming",
 *              "controller"="App\Controller\ComingContestsController",
 *              "openapi_context"={
                    "summary"="Retourne les tournois à venir."
 *              }
 *          },
 *          "inprogress"={
 *              "method"="get",
 *              "path"="/contests/inprogress",
 *              "controller"="App\Controller\InProgressContestsController",
 *              "openapi_context"={
                    "summary"="Retourne les tournois en cours."
 *              }
 *          },
 *          "done"={
 *              "method"="get",
 *              "path"="/contests/done",
 *              "controller"="App\Controller\DoneContestsController",
 *              "openapi_context"={
                    "summary"="Retourne les tournois terminés."
 *              }
 *          }
 *     }
 * )
 */
class Contest
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creationDate;

    /**
     * @ORM\Column(type="datetime")
     */
    private $startDate;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $hallName;

    /**
     * @ORM\Column(type="datetime")
     */
    private $endRegistrationDate;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $attachPicture;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="contests")
     * @ORM\JoinColumn(nullable=false)
     */
    private $creator;

    /**
     * @ORM\OneToMany(targetEntity=ContestCategory::class, mappedBy="contest", orphanRemoval=true)
     */
    private $contestCategories;

    /**
     * @ORM\OneToMany(targetEntity=Media::class, mappedBy="contest")
     */
    private $media;

    /**
     * @ORM\ManyToOne(targetEntity=Club::class, inversedBy="contests")
     * @ORM\JoinColumn(nullable=false)
     */
    private $club;

    /**
     * @ORM\Column(type="datetime")
     */
    private $endDate;

    public function __construct()
    {
        $this->contestCategories = new ArrayCollection();
        $this->media = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): self
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getHallName(): ?string
    {
        return $this->hallName;
    }

    public function setHallName(?string $hallName): self
    {
        $this->hallName = $hallName;

        return $this;
    }

    public function getEndRegistrationDate(): ?\DateTimeInterface
    {
        return $this->endRegistrationDate;
    }

    public function setEndRegistrationDate(\DateTimeInterface $endRegistrationDate): self
    {
        $this->endRegistrationDate = $endRegistrationDate;

        return $this;
    }

    public function getAttachPicture(): ?string
    {
        return $this->attachPicture;
    }

    public function setAttachPicture(?string $attachPicture): self
    {
        $this->attachPicture = $attachPicture;

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    /**
     * @return Collection<int, ContestCategory>
     */
    public function getContestCategories(): Collection
    {
        return $this->contestCategories;
    }

    public function addContestCategory(ContestCategory $contestCategory): self
    {
        if (!$this->contestCategories->contains($contestCategory)) {
            $this->contestCategories[] = $contestCategory;
            $contestCategory->setContest($this);
        }

        return $this;
    }

    public function removeContestCategory(ContestCategory $contestCategory): self
    {
        if ($this->contestCategories->removeElement($contestCategory)) {
            // set the owning side to null (unless already changed)
            if ($contestCategory->getContest() === $this) {
                $contestCategory->setContest(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Media>
     */
    public function getMedia(): Collection
    {
        return $this->media;
    }

    public function addMedium(Media $medium): self
    {
        if (!$this->media->contains($medium)) {
            $this->media[] = $medium;
            $medium->setContest($this);
        }

        return $this;
    }

    public function removeMedium(Media $medium): self
    {
        if ($this->media->removeElement($medium)) {
            // set the owning side to null (unless already changed)
            if ($medium->getContest() === $this) {
                $medium->setContest(null);
            }
        }

        return $this;
    }

    public function getClub(): ?Club
    {
        return $this->club;
    }

    public function setClub(?Club $club): self
    {
        $this->club = $club;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(?\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }
}
