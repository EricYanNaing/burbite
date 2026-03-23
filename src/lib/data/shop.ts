export type Shop = {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    distance: number;
    eta: string;
    open: boolean;
    openTime: string;
    closeTime: string;
}

const shops: Shop[] = [
    {
        id: "1",
        name: "Golden Myanmar Kitchen",
        image: "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "22:00",
    },
    {
        id: "2",
        name: "Burmese Bites",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: false,
        openTime: "08:00",
        closeTime: "22:00",
    },
    {
        id: "3",
        name: "Burmese Tea House",
        image: "https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "22:00",
    },
    {
        id: "4",
        name: "Ygn Noodle House",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "22:00",
    },
    {
        id: "5",
        name: "Mandalay Restaurant",
        image: "https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "22:00",
    },
    {
        id: "6",
        name: "Burmese Kitchen",
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "23:00",
    },
    {
        id: "7",
        name: "Shan Noodle House",
        image: "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "23:00",
    },
    {
        id: "8",
        name: "Golden Myanmar Kitchen",
        image: "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "22:00",
    },
    {
        id: "9",
        name: "Burmese Tea House",
        image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "21:00",
    },
    {
        id: "10",
        name: "Ygn Noodle House",
        image: "https://images.unsplash.com/photo-1567880905822-56f8e06fe630?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHxyZXN0YXVyYW50fGVufDB8fDB8fHww",
        rating: 4.5,
        reviewCount: 100,
        distance: 1,
        eta: "10 mins",
        open: true,
        openTime: "08:00",
        closeTime: "20:00",
    },
]

export async function getShops() {
    return shops;
}

export async function getNearbyShops() {
    return shops.slice(0, 3);
}

export async function getShopById(id: string) {
    return shops.find((shop) => shop.id === id);
}