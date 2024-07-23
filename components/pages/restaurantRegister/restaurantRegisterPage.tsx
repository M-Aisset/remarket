"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { restaurantRegister } from "@/actions/restaurantRegister";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const hours = [
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
  { day: "Saturday" },
  { day: "Sunday" },
];
const restaurantCategories = [
  "Italian",
  "Restaurants",
  "American",
  "Seafood",
  "Diners",
  "Southern",
  "Mediterranean",
  "Burmese",
  "Nightlife",
  "Comfort Food",
  "Tapas/Small Plates",
  "Mexican",
  "Tacos",
  "Burgers",
  "Pizza",
  "Peruvian",
  "Thai",
  "Asian Fusion",
  "Pasta Shops",
  "Lebanese",
  "Salad",
  "Barbeque",
  "Indian",
  "Chinese",
  "Korean",
  "Vegetarian",
  "Middle Eastern",
  "Buffets",
  "Arabic",
  "Dim Sum",
  "Vietnamese",
  "Caterers",
  "Himalayan/Nepalese",
  "Ramen",
  "Soup",
  "Specialty Food",
  "Japanese",
  "Food Delivery Services",
  "Izakaya",
  "Laotian",
  "Food",
  "Taiwanese",
  "Hot Pot",
  "Noodles",
];
const algWilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naama",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "d'In Salah",
  "d'In Guezzam",
  "Touggourt",
  "Djanet",
  "d'El M'Ghair",
  "d'El Meniaa",
];
const restaurantOfferings = ["Reservations", "Offers Delivery", "Outdoor Seating", "Takeaway"];

export default function RestaurantRegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [categories, SetCategories] = useState<string[]>([]);
  const [offerings, SetOfferings] = useState<string[]>([]);
  const [restaurantPhotos, setRestaurantPhotos] = useState<{ id: number; file: File; url: string }[]>([]);
  const [menuPhotos, setMenuPhotos] = useState<{ id: number; file: File; url: string }[]>([]);
  const [popularDishes, setPopularDishes] = useState<{ photo: File; url: string; name: string; price: string }[]>(
    []
  );
  const [isClosed, setIsClosed] = useState<boolean[]>(new Array(7).fill(false));
  const dishePhoto = useRef<HTMLInputElement>(null);
  const disheName = useRef<HTMLInputElement>(null);
  const dishePrice = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEndRestaurantPhotos = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setRestaurantPhotos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  function RestaurantPhotoSortableItem({
    index,
    content,
  }: {
    index: number;
    content: { id: number; file: File; url: string };
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: content.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative border rounded-lg cursor-grab`}
        key={index}
      >
        <Image
          height={0}
          width={0}
          quality={30}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          draggable={false}
          src={content.url}
          alt="Restaurant image"
          className="object-cover rounded-lg aspect-video"
        />
        <Button
          type="button"
          onClick={() => {
            const newArray = [...restaurantPhotos];
            newArray.splice(index, 1);
            setRestaurantPhotos(newArray);
          }}
          size="icon"
          variant="outline"
          className="bg-background hover:bg-accent opacity-80 absolute top-1 right-1 rounded-full p-1.5"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
        <div className="rounded-full border border-white bg-primary size-10 absolute top-1 left-1 text-white flex justify-center items-center">
          {index + 1}
        </div>
      </div>
    );
  }

  const handleDragEndMenuPhotos = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMenuPhotos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  function MenuPhotoSortableItem({
    index,
    content,
  }: {
    index: number;
    content: { id: number; file: File; url: string };
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: content.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative border rounded-lg cursor-grab`}
        key={index}
      >
        <Image
          height={0}
          width={0}
          quality={30}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          src={content.url}
          alt="Menu image"
          className="object-cover rounded-lg aspect-video"
        />
        <Button
          type="button"
          onClick={() => {
            const newArray = [...menuPhotos];
            newArray.splice(index, 1);
            setMenuPhotos(newArray);
          }}
          size="icon"
          variant="outline"
          className="bg-background hover:bg-accent opacity-80 absolute top-1 right-1 rounded-full p-1.5"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
        <div className="rounded-full border border-white bg-primary size-10 absolute top-1 left-1 text-white flex justify-center items-center">
          {index + 1}
        </div>
      </div>
    );
  }

  const [hoursState, setHoursState] = useState<string[]>(Array(28).fill(""));
  const updateHoursState = (index: number, value: string) => {
    setHoursState((prevState) => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return value;
        }
        return item;
      });
    });
  };

  function restaurantPhotosHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files) {
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
      const imageFilesWithUrls = imageFiles.map((file) => ({
        id: Date.now(),
        file,
        url: URL.createObjectURL(file),
      }));
      setRestaurantPhotos((prevFiles) => [...prevFiles, ...imageFilesWithUrls]);
    }
    event.target.value = "";
  }
  function menuPhotosHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files) {
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
      const imageFilesWithUrls = imageFiles.map((file) => ({
        id: Date.now(),
        file,
        url: URL.createObjectURL(file),
      }));
      setMenuPhotos((prevFiles) => [...prevFiles, ...imageFilesWithUrls]);
    }
    event.target.value = "";
  }
  function popularDisheHandler() {
    if (
      dishePhoto.current &&
      dishePhoto.current.files &&
      disheName.current &&
      disheName.current.value &&
      dishePrice.current &&
      dishePrice.current.value &&
      dishePhoto.current.files[0]
    ) {
      const file = dishePhoto.current.files[0];
      const url = URL.createObjectURL(file);
      setPopularDishes([
        ...popularDishes,
        {
          photo: file,
          name: disheName.current.value,
          price: dishePrice.current.value,
          url: url,
        },
      ]);
    }
  }
  function handleCheckboxChange(index: number) {
    const updatedCheckedState = isClosed.map((item, i) => (i === index ? !item : item));
    setIsClosed(updatedCheckedState);
  }

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleInputChangeMM(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = event.target.value;
    if (value === "" || (value.length <= 2 && /^\d*$/.test(value) && Number(value) <= 59))
      updateHoursState(index, value);
    if (value.length === 2 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }
  function handleInputChangeHH(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = event.target.value;
    if (value === "" || (value.length <= 2 && /^\d*$/.test(value) && Number(value) <= 23))
      updateHoursState(index, value);
    if (value.length === 2 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function actionHandler(formData: FormData) {
    isClosed.forEach((isClosed) => {
      formData.append("isClosed", isClosed.toString());
    });
    categories.forEach((category) => {
      formData.append("categories", category);
    });

    offerings.forEach((offering) => {
      formData.append("offerings", offering);
    });

    restaurantPhotos.forEach((photo) => {
      formData.append("restaurantPhotos", photo.file);
    });

    menuPhotos.forEach((photo) => {
      formData.append("menuPhotos", photo.file);
    });

    popularDishes.forEach((dishe) => {
      formData.append("popularDishesNames", dishe.name);
      formData.append("popularDishesPhotos", dishe.photo);
      formData.append("popularDishesPrices", dishe.price);
    });

    const data = await restaurantRegister(formData);
    if (data.success) {
      console.log(data.message);
      router.push(
        searchParams.from !== undefined && searchParams.from !== "" ? (searchParams.from as string) : "/"
      );
    } else {
      console.log(data.message);
    }
  }

  return (
    <div className="py-8 relative overflow-x-hidden">
      <div className="px-2 pb-4">
        <h1 className="text-center font-semibold text-[2.5rem]">Create a new restaurant account</h1>
      </div>
      <form action={actionHandler}>
        <div className="flex justify-center items-center flex-col w-full">
          <div className="flex justify-center items-center gap-4 w-full lg:px-48 px-8">
            <div className="border-t border-primary w-full"></div>
            <p className="text-2xl font-semibold text-primary">Information</p>
            <div className="border-t border-primary w-full"></div>
          </div>
          <div className="mt-6 w-full lg:px-48 px-8 grid grid-cols-1 sm:grid-cols-2 gap-4 gap-x-12">
            <div>
              <Label htmlFor="name" className="text-left text-base">
                Restaurant name :
              </Label>
              <Input id="name" name="name" placeholder="Name" className="mt-2 w-full" />
            </div>
            <div>
              <Label htmlFor="email" className="text-left text-base">
                Restaurant email :
              </Label>
              <Input placeholder="Email" id="email" name="email" className="mt-2 w-full" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-left text-base">
                Restaurant phone :
              </Label>
              <Input placeholder="Phone" id="phone" name="phone" className="mt-2 w-full" />
            </div>
            <div>
              <Label htmlFor="address" className="text-left text-base">
                Restaurant address :
              </Label>
              <Input placeholder="Address" id="address" name="address" className="mt-2 w-full" />
            </div>
            <div>
              <Label htmlFor="wilaya" className="text-left text-base">
                Restaurant wilaya :
              </Label>
              <select
                id="wilaya"
                name="wilaya"
                defaultValue=""
                className="mt-2 h-10 w-full rounded-md border border-input bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Wilaya</option>
                {algWilayas.map((wilaya, idx) => {
                  return (
                    <option key={idx} value={wilaya}>
                      {idx + 1 + "-" + wilaya}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <Label htmlFor="location" className="text-left text-base">
                Restaurant location :
              </Label>
              <Input
                placeholder="Location (Google map link)"
                id="location"
                name="location"
                className="mt-2 w-full"
              />
            </div>
            <div>
              <Label htmlFor="categories" className="text-left text-base">
                Restaurant categories :
              </Label>
              <div className="flex justify-between items-center gap-1 mt-2 h-10 w-full rounded-md border border-input bg-background pl-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <div className="py-1 flex-1 flex justify-start items-center gap-1 overflow-x-auto scrollbar-thin">
                  {categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-nowrap">
                      {category}
                    </Badge>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-muted-foreground select-none pl-1.5">Categories</p>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" className="rounded-l-none border-r-0" variant="outline" id="categories">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="py-4">Categories</DialogTitle>
                      <div className="flex justify-start items-center flex-wrap gap-2 h-[20rem] overflow-y-auto">
                        {restaurantCategories.map((restaurantCategory, index) => (
                          <Button
                            key={index}
                            className="rounded-xl border"
                            size="sm"
                            variant={categories.includes(restaurantCategory) ? "default" : "outline"}
                            onClick={() =>
                              categories.includes(restaurantCategory)
                                ? SetCategories(categories.filter((e) => e !== restaurantCategory))
                                : SetCategories([...categories, restaurantCategory])
                            }
                          >
                            {restaurantCategory}
                          </Button>
                        ))}
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div>
              <Label htmlFor="offerings" className="text-left text-base">
                Restaurant offerings :
              </Label>
              <div className="flex justify-between items-center gap-1 mt-2 h-10 w-full rounded-md border border-input bg-background pl-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <div className="py-1 flex-1 flex justify-start items-center gap-1 overflow-x-auto scrollbar-thin">
                  {offerings.map((offering, index) => (
                    <Badge key={index} variant="secondary" className="text-nowrap">
                      {offering}
                    </Badge>
                  ))}
                  {offerings.length === 0 && <p className="text-muted-foreground select-none pl-1.5">Offerings</p>}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" className="rounded-l-none border-r-0" variant="outline" id="offerings">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="py-4">Offerings</DialogTitle>
                      <div className="flex justify-start items-center flex-wrap gap-2 overflow-y-auto">
                        {restaurantOfferings.map((offering, index) => (
                          <Button
                            key={index}
                            className="rounded-xl border"
                            size="sm"
                            variant={offerings.includes(offering) ? "default" : "outline"}
                            onClick={() =>
                              offerings.includes(offering)
                                ? SetOfferings(offerings.filter((e) => e !== offering))
                                : SetOfferings([...offerings, offering])
                            }
                          >
                            {offering}
                          </Button>
                        ))}
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="description" className="text-left text-base">
                Description :
              </Label>
              <Textarea
                id="description"
                name="description"
                className="mt-2 bg-background w-full min-h-32 rounded-md border p-2 resize-none"
                placeholder="Write a description ..."
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="restaurantPhotos" className="text-left text-base">
                Restaurant photos :
              </Label>
              <div className="mt-2 rounded-md border">
                <div className="min-h-40 rounded-md p-4">
                  {restaurantPhotos.length === 0 ? (
                    <div className="flex justify-center items-center h-40">
                      <p>No images selected</p>
                    </div>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEndRestaurantPhotos}
                    >
                      <SortableContext items={restaurantPhotos} strategy={rectSortingStrategy}>
                        <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {restaurantPhotos.map((photo, index) => (
                            <RestaurantPhotoSortableItem key={photo.id} index={index} content={photo} />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
                <div className="flex items-center border-t p-4">
                  <Label className="relative cursor-pointer h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <span>Upload</span>
                    <input
                      id="restaurantPhotos"
                      type="file"
                      className="sr-only"
                      onChange={restaurantPhotosHandler}
                      multiple
                      accept="image/*"
                    />
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center items-center gap-4 w-full lg:px-48 px-8">
            <div className="border-t border-primary w-full"></div>
            <p className="text-2xl font-semibold text-primary">Menu</p>
            <div className="border-t border-primary w-full"></div>
          </div>
          <div className="mt-6 w-full lg:px-48 px-8 grid grid-cols-1 sm:grid-cols-2 gap-4 gap-x-12">
            <div className="sm:col-span-2">
              <Label htmlFor="popularDishes" className="text-left text-base">
                Popular dishes :
              </Label>
              <div className={`mt-2 ${popularDishes.length === 0 ? "pb-10" : "pb-2"} border rounded-md`}>
                <Table className="text-nowrap">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Photo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-center">Options</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularDishes.map((popularDishe, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="w-[180px]">
                            <Image
                              height={0}
                              width={0}
                              sizes="100vw"
                              style={{ width: "100%", height: "100%" }}
                              src={popularDishe.url}
                              alt="Dishe image"
                              className="rounded-md object-cover aspect-video"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{popularDishe.name}</TableCell>
                        <TableCell>{popularDishe.price} DA</TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <Button
                              type="button"
                              variant="ghost"
                              className="rounded-lg text-red-500 hover:text-red-500"
                              onClick={() => {
                                const newArray = popularDishes;
                                newArray.splice(index, 1);
                                setPopularDishes(newArray);
                                router.refresh();
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button id="popularDishes" type="button" className="mt-4" variant="outline">
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">Add a dishe</DialogTitle>
                    <div className="text-left">
                      <div>
                        <Label htmlFor="dishePhoto" className="text-left text-base">
                          Dishe photo :
                        </Label>
                        <Input
                          ref={dishePhoto}
                          type="file"
                          id="dishePhoto"
                          accept="image/*"
                          placeholder="Dishe photo"
                          className="mt-2 w-full"
                        />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="disheName" className="text-left text-base">
                          Dishe name :
                        </Label>
                        <Input ref={disheName} id="disheName" placeholder="Dishe name" className="mt-2 w-full" />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="dishePrice" className="text-left text-base">
                          Dishe price :
                        </Label>
                        <Input
                          ref={dishePrice}
                          type="number"
                          id="dishePrice"
                          placeholder="Dishe price"
                          className="mt-2 w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-center items-center">
                        <DialogClose asChild>
                          <Button type="button" className="w-24" onClick={popularDisheHandler}>
                            Add
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="menuPhotos" className="text-left text-base">
                Menu photos :
              </Label>
              <div className="mt-2 rounded-md border">
                <div className="min-h-40 rounded-md p-4">
                  {menuPhotos.length === 0 ? (
                    <div className="flex justify-center items-center h-40">
                      <p>No images selected</p>
                    </div>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEndMenuPhotos}
                    >
                      <SortableContext items={menuPhotos} strategy={rectSortingStrategy}>
                        <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {menuPhotos.map((photo, index) => (
                            <MenuPhotoSortableItem key={photo.id} index={index} content={photo} />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
                <div className="flex items-center p-4 border-t">
                  <Label className="relative cursor-pointer h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <span>Upload</span>
                    <input
                      id="menuPhotos"
                      type="file"
                      className="sr-only"
                      onChange={menuPhotosHandler}
                      multiple
                      accept="image/*"
                    />
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center items-center gap-4 w-full lg:px-48 px-8">
            <div className="border-t border-primary w-full"></div>
            <p className="text-2xl font-semibold text-primary">Hours</p>
            <div className="border-t border-primary w-full"></div>
          </div>
          <div className="mt-6 w-full lg:px-48 px-8">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {hours.map((hours, index) => (
                    <tr key={index}>
                      <td className="font-medium pr-8 py-1.5">{hours.day}</td>
                      <td className="pr-8 py-1.5">
                        <div className="flex justify-center items-center gap-1">
                          From:
                          <Input
                            id={"fromHours" + hours.day}
                            name="fromHours"
                            type="number"
                            placeholder="--"
                            className="w-16 text-center"
                            ref={(el) => {
                              inputRefs.current[index * 4] = el;
                            }}
                            value={hoursState[index * 4]}
                            onChange={(e) => handleInputChangeHH(e, index * 4)}
                            onKeyDown={(e) => handleKeyDown(e, index * 4)}
                          />
                          :
                          <Input
                            id={"fromMinutes" + hours.day}
                            name="fromMinutes"
                            type="number"
                            placeholder="--"
                            className="w-16 text-center"
                            ref={(el) => {
                              inputRefs.current[index * 4 + 1] = el;
                            }}
                            value={hoursState[index * 4 + 1]}
                            onChange={(e) => handleInputChangeMM(e, index * 4 + 1)}
                            onKeyDown={(e) => handleKeyDown(e, index * 4 + 1)}
                          />
                        </div>
                      </td>
                      <td className="pr-8 py-1.5">
                        <div className="flex justify-center items-center gap-1">
                          To:
                          <Input
                            id={"toHours" + hours.day}
                            name="toHours"
                            type="number"
                            placeholder="--"
                            className="w-16 text-center"
                            ref={(el) => {
                              inputRefs.current[index * 4 + 2] = el;
                            }}
                            value={hoursState[index * 4 + 2]}
                            onChange={(e) => handleInputChangeHH(e, index * 4 + 2)}
                            onKeyDown={(e) => handleKeyDown(e, index * 4 + 2)}
                          />
                          :
                          <Input
                            id={"toMinutes" + hours.day}
                            name="toMinutes"
                            type="number"
                            placeholder="--"
                            className="w-16 text-center"
                            ref={(el) => {
                              inputRefs.current[index * 4 + 3] = el;
                            }}
                            value={hoursState[index * 4 + 3]}
                            onChange={(e) => handleInputChangeMM(e, index * 4 + 3)}
                            onKeyDown={(e) => handleKeyDown(e, index * 4 + 3)}
                          />
                        </div>
                      </td>
                      <td className="py-1.5">
                        <div className="flex justify-end items-center gap-2">
                          <Checkbox
                            id={"isClosed" + hours.day}
                            className="size-5"
                            checked={isClosed[index]}
                            onCheckedChange={() => handleCheckboxChange(index)}
                          />
                          <Label
                            htmlFor={"isClosed" + hours.day}
                            className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Closed
                          </Label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center lg:px-48 px-8 mt-12 gap-8 ">
          <Link
            href={
              searchParams.from !== undefined && searchParams.from !== "" ? (searchParams.from as string) : "/"
            }
          >
            <Button type="button" variant="outline" className="w-32">
              Cancel
            </Button>
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-32" disabled={pending}>
      Sign up
    </Button>
  );
}
