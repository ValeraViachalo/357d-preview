import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { anim, BluredPresence, ProjectsAnim } from "@/lib/helpers/anim";
import { DoubleRangeSlider } from "./RangeInput/RangeInput";

import "./Filters.scss";

const getPriceRange = (worksList) => {
  const prices = worksList.map((work) =>
    parseInt(work.description.price.value.replace(/\s/g, ""))
  );
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

export const Filters = ({
  data,
  worksList,
  setWorksList,
  activeFilters,
  setActiveFilters,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const { min: minPrice, max: maxPrice } = getPriceRange(data.list);
  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });
  const [startValue, setStartValue] = useState(minPrice);
  const [endValue, setEndValue] = useState(maxPrice);
  const originalWorks = useRef(data.list);

  const applyFilters = useCallback(
    (type, status, priceMin, priceMax) => {
      let filteredWorks = [...originalWorks.current];

      if (type) {
        filteredWorks = filteredWorks.filter(
          (work) => work.description.type.slug === type
        );
      }

      if (status) {
        filteredWorks = filteredWorks.filter(
          (work) => work.description.status.slug === status
        );
      }

      if (priceMin !== undefined && priceMax !== undefined) {
        filteredWorks = filteredWorks.filter((work) => {
          const price = parseInt(
            work.description.price.value.replace(/\s/g, "")
          );
          return price >= priceMin && price <= priceMax;
        });
      }

      setWorksList(filteredWorks);
    },
    [setWorksList]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters(
        activeFilters.type,
        activeFilters.status,
        priceRange.min,
        priceRange.max
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [priceRange, activeFilters, applyFilters]);

  const updateFilter = (filterType, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[filterType] === value) {
      newFilters[filterType] = "";
    } else {
      newFilters[filterType] = value;
    }
    setActiveFilters(newFilters);
    applyFilters(
      newFilters.type,
      newFilters.status,
      priceRange.min,
      priceRange.max
    );
  };

  const resetFilter = (filterType) => {
    const newFilters = { ...activeFilters, [filterType]: "" };
    setActiveFilters(newFilters);
    applyFilters(
      newFilters.type,
      newFilters.status,
      priceRange.min,
      priceRange.max
    );
  };

  const clearAllFilters = () => {
    setActiveFilters({ type: "", status: "" });
    setPriceRange({ min: minPrice, max: maxPrice });
    setStartValue(minPrice);
    setEndValue(maxPrice);
    setWorksList([...data.list]);
  };

  const handlePriceRangeChange = (range) => {
    if (range.min !== priceRange.min || range.max !== priceRange.max) {
      setPriceRange(range);
      setStartValue(range.min);
      setEndValue(range.max);
    }
  };

  return (
    <section
      className={classNames("filters container grid", {
        "filters--active": isOpened,
      })}
    >
      <button className="open-button" onClick={() => setIsOpened(!isOpened)}>
        <p
          className="open-button__text-wrapper"
          aria-label={data.filter.topTitle}
        >
          {data.filter.topTitle &&
            data.filter.topTitle.split("").map((word, index) => (
              <span
                className="open-button__text"
                key={index}
                style={{
                  transitionDelay: `${
                    (index / data.filter.topTitle.split("").length) * 0.06
                  }s`,
                }}
              >
                {word !== " " ? word : <>&nbsp;</>}
              </span>
            ))}
        </p>
        <div className="open-button__line-wrapper">
          <span className="open-button__line" />
          <span className="open-button__line" />
        </div>
      </button>

      <AnimatePresence mode="wait">
        {isOpened && (
          <motion.div
            className="filters-body grid"
            {...anim(ProjectsAnim.wrapper)}
          >
            <div className="filters-body__wrapper">
              <FiltersWrapper
                data={data.filter.type}
                activeFilter={activeFilters.type}
                onFilterChange={(value) => updateFilter("type", value)}
                onReset={() => resetFilter("type")}
              />
              <FiltersWrapper
                data={data.filter.status}
                activeFilter={activeFilters.status}
                onFilterChange={(value) => updateFilter("status", value)}
                onReset={() => resetFilter("status")}
              />
              <div className="filter-range">
                <motion.div
                  variants={BluredPresence}
                  initial="initial"
                  animate="animate"
                  custom={{ id: 0.5, duration: 1 }}
                  className="title"
                >
                  {data?.filter?.budget?.title}
                </motion.div>
                <motion.div
                  variants={BluredPresence}
                  initial="initial"
                  animate="animate"
                  custom={{ id: 2, duration: 1 }}
                  className="filter-range__wrapper"
                >
                  <DoubleRangeSlider
                    minValue={minPrice}
                    maxValue={maxPrice}
                    onChange={handlePriceRangeChange}
                    initialMin={startValue}
                    initialMax={endValue}
                  />
                </motion.div>
              </div>
            </div>

            <button
              onClick={clearAllFilters}
              className={classNames("clear-button", {
                "clear-button--active":
                  activeFilters.type ||
                  activeFilters.status ||
                  priceRange.min !== minPrice ||
                  priceRange.max !== maxPrice,
              })}
            >
              <svg
                className="clear-button-icon"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L8.5 8.5L16 1.5"
                  stroke="black"
                  strokeWidth="1.4"
                />
                <path
                  d="M1 15.5L8.5 8.5L16 15.5"
                  stroke="black"
                  strokeWidth="1.4"
                />
              </svg>
              <span className="link-text">{data.filter.clear.title}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const FiltersWrapper = ({
  data,
  activeFilter,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="filter-wrapper">
      <motion.div
        variants={BluredPresence}
        initial="initial"
        animate="animate"
        custom={{ id: 0.5, duration: 1 }}
        className="title"
      >
        {data.title}
      </motion.div>

      <div className="options">
        <motion.button
          onClick={onReset}
          className={classNames("link link-reset bold small-text", {
            "link--active": activeFilter === "",
          })}
          variants={BluredPresence}
          initial="initial"
          animate="animate"
          custom={{ id: 1, duration: 1 }}
        >
          <span className="link-text">{data.reset.text}</span>
        </motion.button>
        {data.filters.map((filter, index) => (
          <motion.button
            key={`${filter.slug}-${index}`}
            onClick={() => onFilterChange(filter.slug)}
            className={classNames("link small-text", {
              "link--active": activeFilter === filter.slug,
            })}
            variants={BluredPresence}
            initial="initial"
            animate="animate"
            custom={{ id: index + 1, duration: 1 }}
          >
            <span className="link-text">{filter.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};