import { useEffect, useState } from 'react';

import '../styles/Home.css';
import { listAllBreedAPI, getSingleBreedAPI } from '../api';

import { Cascader, Flex, Spin, Card, Image } from 'antd';
const { SHOW_CHILD } = Cascader;

export default function Home({ selectedBreedsImg, setSelectedBreedsImg }) {
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [allBreeds, setAllBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBreeds = async () => {
    setIsLoading(true);
    const res = await listAllBreedAPI();
    setAllBreeds(Object.keys(res.message));
    setIsLoading(false);
  };

  const getBreedsImg = async () => {
    const res = await Promise.all(
      selectedBreeds.map(async breed => {
        const { message } = await getSingleBreedAPI(breed, 1);
        // debugger;
        return { img: message[0], name: breed };
      })
    );
    setSelectedBreedsImg(res);
  };

  const onChangeCascader = value => {
    setSelectedBreeds(value);
  };
  const filter = (inputValue, path) =>
    path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  useEffect(() => {
    getAllBreeds();
  }, []);

  useEffect(() => {
    getBreedsImg();
  }, [selectedBreeds]);

  return (
    <>
      {isLoading ? (
        <Flex align="center">
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          <Flex
            align="center"
            vertical
            className="mb-5 mt-16 sm:mt-40 home-title"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-1">Breedy</h1>
            <h2 className="text-md md:text-3xl font-semibold mb-5">
              The place of your favorite dog breeds
            </h2>
            <Cascader
              options={allBreeds.map(breedName => ({
                value: breedName,
                label: breedName,
              }))}
              multiple
              onChange={onChangeCascader}
              placeholder="Search your favorite dog breeds"
              showSearch={{ filter }}
              showCheckedStrategy={SHOW_CHILD}
              className="min-h-9 home-cascader"
            />
          </Flex>

          <Flex className="gap-3 max-w-4xl justify-center pb-10 " wrap>
            {selectedBreedsImg.map(breedImg => {
              return (
                <Card
                  title={breedImg.name}
                  className=" w-60 text-center"
                  key={breedImg.name}
                  size="small"
                >
                  <Flex justify="center" align="center">
                    <Image
                      alt={breedImg.name}
                      src={breedImg.img}
                      className=" max-h-32 object-fill"
                    />
                  </Flex>
                </Card>
              );
            })}
          </Flex>
        </>
      )}
    </>
  );
}
