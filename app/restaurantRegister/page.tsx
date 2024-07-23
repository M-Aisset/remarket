import RestaurantRegisterPage from "@/components/pages/restaurantRegister/restaurantRegisterPage";

export default function RestaurantRegister({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <RestaurantRegisterPage searchParams={searchParams} />
    </div>
  );
}
