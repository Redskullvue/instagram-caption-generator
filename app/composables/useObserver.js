import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

export const useObserver = (targetRef, options = {}) => {
  const isVisible = ref(false);
  const observerRef = { current: null };
  const opts = {
    threshold: options.threshold ?? 0.2,
    root: options.root ?? null,
    rootMargin: options.rootMargin ?? "0px",
    once: options.once ?? true,
  };

  const createObserver = () => {
    // guard: only create if we have a target DOM node
    if (!targetRef || !targetRef.value) return;

    // avoid creating multiple observers
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;

          if (opts.once) {
            // stop observing after first intersection if once=true
            observerRef.current.unobserve(targetRef.value);
          }
        } else {
          // if once=false we want isVisible to flip back to false when out of view
          if (!opts.once) {
            isVisible.value = false;
          }
        }
      },
      {
        threshold: opts.threshold,
        root: opts.root,
        rootMargin: opts.rootMargin,
      }
    );

    observerRef.current.observe(targetRef.value);
  };

  // Create observer after mount (client-only)
  onMounted(() => {
    // nextTick ensures the element is mounted and ref is attached
    nextTick(() => {
      createObserver();
    });
  });

  // If the ref is initially null but later gets set (e.g. v-if or dynamic mount),
  // watch it and create observer when it becomes available.
  watch(
    () => targetRef && targetRef.value,
    (val) => {
      if (val) {
        // small nextTick to be safe
        nextTick(() => createObserver());
      }
    }
  );

  // cleanup
  onBeforeUnmount(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  });

  return { isVisible };
};
