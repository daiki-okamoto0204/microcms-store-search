import React, { Suspense } from 'react'
import getStore from './_api/getStore'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import parse from 'html-react-parser'
import Map from './_components/Map'

type Props = {
	params: { storeId: string };
};

const Page = async (props: Props) => {
  const store = await getStore(props.params.storeId)

  if (!store) {
		notFound();
	}

  const center = { lat: 35.0088831, lng: 135.758829 }
  const positions = [{lat: Number(store.lat), lng: Number(store.lng)}]

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{store.categories[0].title}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{store.name}</h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">店舗詳細</a>
              </div>
              <div className="leading-relaxed mb-4">{parse(store.content ?? '')}</div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">住所</span>
                <span className="ml-auto text-gray-900">{store.address}</span>
              </div>
              <div className="flex border-t border-b border-gray-200 py-2">
                <span className="text-gray-500">電話番号</span>
                <span className="ml-auto text-gray-900">{store.tel}</span>
              </div>
            </div>
            <Image
              src={store.image?.url ?? "/400x400.png"}
              alt="店舗画像"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font relative">
        <Suspense>
          <div className="absolute inset-0 h-screen">
            <Map zoom={13} positions={positions} center={center} />
          </div>
        </Suspense>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">店舗へのお問い合わせ</h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">メールアドレス</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">お問い合わせ</label>
              <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">送信</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
